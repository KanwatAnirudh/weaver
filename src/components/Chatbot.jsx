import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';

const systemInstruction = `You are a helpful and polite virtual assistant for the Weeavers Foundation website.
Weeavers Foundation is a leading NGO in Delhi NCR (India) dedicated to social wellness and welfare.
You help visitors understand what the site is about, guide them to different sections (like About Us, Projects, Causes, Get Involved, Contact, Donate), and answer questions about our causes (like Education for All, Health & Healthcare, Women's Empowerment).
Keep your answers concise, friendly, and helpful. Always encourage users to donate or get involved if appropriate.
Contact Info: +91 98188 85691 | info@weeavers.org.
Centers: Delhi (HQ), Maharashtra, Uttar Pradesh, Jharkhand, Bihar.
If someone asks something unrelated to the NGO or social work, politely remind them that you are here to assist with the Weeavers Foundation website.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am the Weeavers Foundation Assistant. How can I help you navigate the site today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const chatSessionRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const isCustomBackend = apiKey?.startsWith('http');

  useEffect(() => {
    if (isOpen && !chatSessionRef.current && apiKey && !isCustomBackend) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-flash-latest',
          systemInstruction: systemInstruction,
        });
        chatSessionRef.current = model.startChat({
          history: [],
        });
      } catch (err) {
        console.error("Failed to initialize Gemini:", err);
        setError("Failed to initialize chat. Please try again later.");
      }
    }
  }, [isOpen, apiKey, isCustomBackend]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Error: VITE_GEMINI_API_KEY is not set. Please add it to your environment variables to use the chatbot.' }
      ]);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let responseText = '';

      if (isCustomBackend) {
        const res = await fetch(apiKey, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            prompt: userMsg,
            message: userMsg, // Sending both common formats just in case
            history: messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }))
          }),
        });

        if (!res.ok) {
          throw new Error(`Backend returned status ${res.status}`);
        }

        const data = await res.json();
        // Assume backend returns { response: "..." } or { text: "..." } or just string
        responseText = data.response || data.text || data.message || data.reply || (typeof data === 'string' ? data : "Sorry, I couldn't understand the server response.");
      } else {
        const result = await chatSessionRef.current.sendMessage(userMsg);
        responseText = result.response.text();
      }
      
      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error('Chat error:', err);
      setError('Sorry, something went wrong. Please try again.');
      setMessages((prev) => [...prev, { role: 'model', text: 'I encountered an error. Please try asking again!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-blue-800 transition-all z-40 flex items-center justify-center ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open Chat"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 z-50 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-none mb-1">Weeavers Assistant</h3>
              <p className="text-xs text-blue-100">Always here to help</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-sm'
                }`}
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm p-3 flex gap-2 items-center">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs">Typing...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="text-center text-xs text-red-500 mt-2">
              {error}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex items-center gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-1 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-primary transition-colors"
            >
              <Send size={16} className="ml-[-2px]" />
            </button>
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400 font-medium">Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </>
  );
}
