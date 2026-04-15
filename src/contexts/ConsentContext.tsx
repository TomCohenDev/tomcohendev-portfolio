import React, { createContext, useContext, useState, useEffect } from 'react';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface ConsentContextType {
  consent: ConsentState | null;
  showBanner: boolean;
  updateConsent: (consent: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  resetConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'cookie-consent';

// Google Consent Mode v2 helper
const updateGoogleConsent = (consent: ConsentState) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
      'functionality_storage': consent.functional ? 'granted' : 'denied',
      'personalization_storage': consent.functional ? 'granted' : 'denied',
    });
  }
};

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check for existing consent
    const savedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
        updateGoogleConsent(parsed);
      } catch (e) {
        console.error('Failed to parse consent:', e);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newConsent: ConsentState) => {
    setConsent(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    updateGoogleConsent(newConsent);
    setShowBanner(false);
  };

  const acceptAll = () => {
    const allConsent = {
      analytics: true,
      marketing: true,
      functional: true,
    };
    updateConsent(allConsent);
  };

  const rejectAll = () => {
    const noConsent = {
      analytics: false,
      marketing: false,
      functional: true, // Functional cookies are typically required
    };
    updateConsent(noConsent);
  };

  const resetConsent = () => {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    setConsent(null);
    setShowBanner(true);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        showBanner,
        updateConsent,
        acceptAll,
        rejectAll,
        resetConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};
