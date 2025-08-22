import React from 'react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-[#703bf7] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#8254f8] transition-all transform hover:scale-105 z-40 group"
      aria-label="Open Chat"
    >
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#dbcefd] rounded-full animate-ping"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#dbcefd] rounded-full"></div>
      </div>
      <span className="absolute -bottom-8 text-xs font-medium text-[#703bf7] bg-white px-2 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
        Ask Esty
      </span>
    </button>
  );
};

export default ChatButton;