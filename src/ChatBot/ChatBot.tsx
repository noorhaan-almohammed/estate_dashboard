import React, { useState, useRef, useEffect } from 'react';
import { BiArrowToRight } from 'react-icons/bi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

// Site data for dashboard
const dashboardData = {
  companyName: "Estatein",
  sections: [
    "Properties",
    "Stats",
    "Achievements",
    "Team",
    "Office Location",
    "FAQ",
    "Reviews",
    "Client"
  ],
  propertyTypes: [
    "Apartments",
    "Villas",
    "Stores",
    "Lands"
  ],
  stats: {
    happyCustomers: "200",
    propertiesForClients: "10k+",
    yearsOfExperience: "16+"
  },
  contact: {
    phone: "+966112345678",
    email: "support@esty.com",
  }
};

// Suggested questions for dashboard
const suggestedQuestions = [
  "How do I add a new property?",
  "How do I edit an existing property?",
  "How do I add a new client?",
  "Where can I view all properties?",
  "Where can I view all clients?",
  "How do I check statistics?",
  "How do I manage team members?",
  "How do I update office location?"
];

// Keyword system with predefined responses for dashboard
const keywordResponses: { keywords: string[], response: string }[] = [
  {
    keywords: ["add property", "new property", "create property", "add building"],
    response: `To add a new property:\n\n1. Go to the Properties section from the sidebar\n2. Click on the "Add New Property" button\n3. Fill in all required details (type, location, price, etc.)\n4. Upload property images\n5. Click "Save" to add the property to your listings\n\nWould you like more specific instructions?`
  },
  {
    keywords: ["edit property", "modify property", "update property", "change property"],
    response: `To edit an existing property:\n\n1. Navigate to the Properties section\n2. Find the property you want to edit using search or filters\n3. Click on the property to view details\n4. Click the "Edit" button\n5. Make your changes and click "Save"\n\nNeed help with a specific property?`
  },
  {
    keywords: ["add client", "new client", "create client", "register client"],
    response: `To add a new client:\n\n1. Go to the Clients section from the sidebar\n2. Click on "Add New Client"\n3. Enter client information (name, contact details, preferences)\n4. Optionally, assign properties to this client\n5. Click "Save" to add the client to your database\n\nIs there a specific type of client you're adding?`
  },
  {
    keywords: ["view properties", "see properties", "browse properties", "all properties", "property list"],
    response: `To view all properties:\n\n1. Click on "Properties" in the sidebar\n2. You'll see a complete list of all properties\n3. Use filters to narrow down by type, location, or price\n4. Use search to find specific properties\n5. Click on any property to view detailed information\n\nWould you like to filter by a specific property type?`
  },
  {
    keywords: ["view clients", "see clients", "browse clients", "all clients", "client list"],
    response: `To view all clients:\n\n1. Click on "Clients" in the sidebar\n2. You'll see a complete list of all clients\n3. Use filters to narrow down by status or preferences\n4. Use search to find specific clients\n5. Click on any client to view detailed information and their property interests\n\nDo you need help finding a specific client?`
  },
  {
    keywords: ["statistics", "stats", "analytics", "reports", "data"],
    response: `To access statistics:\n\n1. Click on "Stats" in the sidebar\n2. You'll see an overview of key metrics\n3. Use date filters to view data for specific periods\n4. Export reports if needed\n5. View property performance, client engagement, and financial metrics\n\nIs there a specific statistic you're looking for?`
  },
  {
    keywords: ["team", "team members", "staff", "employees"],
    response: `To manage team members:\n\n1. Go to the "Team" section from the sidebar\n2. View all team members and their roles\n3. Add new team members with the "Add Member" button\n4. Edit permissions and access levels as needed\n5. Track team performance and assignments\n\nDo you need to add or modify a team member?`
  },
  {
    keywords: ["office", "location", "address", "office location"],
    response: `To update office location:\n\n1. Navigate to "Office Location" in the sidebar\n2. View current office details\n3. Click "Edit" to update address, phone, or hours\n4. Add multiple office locations if needed\n5. Save changes to update across the platform\n\nAre you updating an existing location or adding a new one?`
  },
  {
    keywords: ["thank", "thanks", "appreciate", "thank you"],
    response: "You're welcome! I'm here to help with any other dashboard questions you might have."
  }
];

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const API_KEY = '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';
  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Find predefined response based on keywords
  const findKeywordResponse = (userInput: string): string | null => {
    const inputLower = userInput.toLowerCase();
    for (const item of keywordResponses) {
      for (const keyword of item.keywords) {
        if (inputLower.includes(keyword.toLowerCase())) {
          return item.response;
        }
      }
    }
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Check first for predefined keyword responses
    const keywordResponse = findKeywordResponse(input);
    
    if (keywordResponse) {
      // Use predefined response if found
      setTimeout(() => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: keywordResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } else {
      // If no predefined response, use API
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [
              {
                role: 'system',
                content: `You are an assistant for the real estate dashboard "${dashboardData.companyName}". 
                Dashboard sections: ${dashboardData.sections.join(', ')}.
                Property types: ${dashboardData.propertyTypes.join(', ')}.
                Statistics: ${dashboardData.stats.happyCustomers} happy customers, ${dashboardData.stats.propertiesForClients} properties, ${dashboardData.stats.yearsOfExperience} years experience.
                Contact information: phone ${dashboardData.contact.phone}, email ${dashboardData.contact.email}.
                Respond in a helpful and professional manner focused on dashboard functionality.`
              },
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: 'user', content: input }
            ],
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.choices[0].message.content,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Sorry, there was a connection error. Please try again.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    // Auto-send if it's a suggested question
    setTimeout(() => sendMessage(), 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 bg-bg rounded-2xl shadow-2xl border border-[#374151] flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-bg text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-mainPurple rounded-full animate-pulse"></div>
          <h3 className="font-semibold text-lg">Dashboard Assistant</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-[#9ca3af] transition-colors p-1 rounded-full hover:bg-[#374151]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-darkGray">
        {messages.length === 0 ? (
          <div className="text-center text-[#d1d5db] mt-4 flex flex-col items-center">
             
            <p className="font-medium">Hello! How can I help with your dashboard?</p>
            <p className="text-sm mt-1 text-[#9ca3af] mb-4">Ask me about managing properties, clients, or data</p>
            
            {/* Suggested questions */}
            <div className="w-full space-y-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="w-full text-sm bg-mainPurple text-[#e5e7eb] border border-[#4b5563] rounded-xl p-2 hover:bg-[#4b5563] transition-colors text-left"
                > 
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl p-3 ${message.role === 'user'
                  ? 'bg-mainPurple text-white rounded-br-md'
                  : 'bg-[#374151] text-[#e5e7eb] rounded-bl-md border border-[#4b5563]'
                  }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-[#bfdbfe]' : 'text-[#9ca3af]'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#374151] text-[#e5e7eb] rounded-2xl rounded-bl-md p-3 border border-[#4b5563]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-secPurple rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#c960fa] rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-mainPurple rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-[#374151] p-3 bg-bg">
        <div className="flex items-center">
          <input
            className="flex-1 border text-white border-[#4b5563] rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-secPurple text-sm bg-darkGray"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="ml-2 bg-mainPurple text-white rounded-xl p-2 hover:bg-secPurple transition-colors focus:outline-none focus:ring-2 focus:ring-secPurple disabled:opacity-50"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            <BiArrowToRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;