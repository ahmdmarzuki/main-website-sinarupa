import React, { useState, useRef, useEffect } from "react";
import { geminiModel } from "../firebase/geminiService";

const geminiBrief = "";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Halo! Saya AI, ada yang bisa saya bantu?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const result = await geminiModel.generateContent([
      userMessage.text,
      geminiBrief,
    ]);
    const response = result.response;
    const text = response.text();

    // Simulasi balasan AI
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: text,
        },
      ]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-orange-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg flex flex-col h-[80vh]">
        <div className="px-4 py-3 border-b text-2xl font-bold text-indigo-700">
          Chatbot Sinarupa
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line text-sm shadow
                  ${
                    msg.sender === "user"
                      ? "bg-orange-200 text-right"
                      : "bg-indigo-100 text-left"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-4 border-t"
        >
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Tulis pesan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold disabled:opacity-50"
            disabled={!input.trim()}
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
