import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

const ChatWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message sending logic here
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-card border border-border rounded-lg shadow-soft animate-scale-in mb-2">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Chat with us</h3>
            <button 
              onClick={toggleChat}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-foreground">Hello! How can I help you today?</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm 
                          focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md 
                          hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-purple 
                   hover:scale-110 transition-all duration-200 flex items-center justify-center
                   ${isVisible ? 'chat-bubble-enter' : 'scale-0 opacity-0'}`}
        aria-label="Toggle chat"
      >
        {isChatOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;