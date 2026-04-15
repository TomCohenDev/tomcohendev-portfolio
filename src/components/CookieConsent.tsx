import React from 'react';
import { useConsent } from '../contexts/ConsentContext';
import { Button } from './ui/button';
import { Cookie } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const { showBanner, acceptAll, rejectAll } = useConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(150,3%,8%)] border-t shadow-lg">
      <div className="container max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <Cookie className="h-4 w-4 text-primary flex-shrink-0" />

          <p className="text-xs text-muted-foreground flex-1">
            We use cookies to analyze our traffic. By clicking "Accept", you consent to our use of cookies.
          </p>

          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={acceptAll}
              size="sm"
              className="text-xs h-8 bg-primary text-purple-950 hover:bg-primary/90"
            >
              Accept
            </Button>
            <Button
              onClick={rejectAll}
              variant="outline"
              size="sm"
              className="text-xs h-8 hover:bg-transparent"
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
