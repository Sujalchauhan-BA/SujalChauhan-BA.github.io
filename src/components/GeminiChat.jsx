import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { resumeData } from '../resumeData';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import './GeminiChat.css';

const RESUME_DATA_STRING = JSON.stringify(resumeData);

const GeminiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: "Hello! I'm Sujal's AI Assistant. Ask me anything about his experience, skills, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatSessionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key missing. Please set VITE_GEMINI_API_KEY in your environment.");
      }

      // Initialize chat session if it doesn't exist
      if (!chatSessionRef.current) {
        const genAI = new GoogleGenerativeAI(apiKey);
        const chatModel = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const systemPrompt = `You are an AI assistant for Sujal Chauhan. Answer recruiter questions using his resume data provided below. Be professional and concise.

        Resume Data:
        ${RESUME_DATA_STRING}
        `;

        chatSessionRef.current = chatModel.startChat({
          history: [
            {
                role: "user",
                parts: [{ text: systemPrompt }]
            },
            {
                role: "model",
                parts: [{ text: "Understood. I am ready to answer questions about Sujal Chauhan." }]
            }
          ],
        });
      }

      const result = await chatSessionRef.current.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      let errorMessage = "I'm having trouble connecting right now. Please try again later.";

      if (error.message.includes("API Key missing")) {
        errorMessage = "Configuration Error: API Key is missing.";
      } else if (error.message.includes("403")) {
          errorMessage = "Access Error: The API key is invalid or has expired.";
      } else if (error.message.includes("429")) {
          errorMessage = "Service Busy: Too many requests. Please try again in a moment.";
      } else {
          errorMessage = `Connection Error: ${error.message || "Unknown error"}`;
      }

      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
      chatSessionRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`gemini-chat-widget ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          <MessageCircle size={24} />
          <span className="tooltip">Ask Sujal AI</span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window glassmorphism">
          <div className="chat-header">
            <div className="header-info">
              <Bot size={20} className="bot-icon" />
              <h3>Ask Sujal AI</h3>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message model">
                <div className="message-content typing">
                  <Loader2 size={16} className="spinner" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Sujal's skills..."
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;