import { useState } from "react";
import axios from "axios";

export default function PolicyChatbot({ recommendations, userQuery }) {
  const baseUrl = "https://lic-policy-recommender-backend.onrender.com";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setLoading(true);
    setInput("");

    try {
      const res = await axios.post(`${baseUrl}/api/chat`, {
        userQuery: input,
        recommendations,
        originalQuery: userQuery,
      });

      const reply = res.data.reply;
      let currentText = "";
      const botMessage = { sender: "bot", text: "" };
      setMessages([...newMessages, botMessage]);

      for (let i = 0; i < reply.length; i++) {
        currentText += reply[i];
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...botMessage, text: currentText };
          return updated;
        });

        await new Promise((r) => setTimeout(r, 10));
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      if (/^\*\*(.*?)\*\*$/.test(line.trim())) {
        return (
          <h3 key={index} className="font-bold text-[#fcc860] mt-2">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }

      if (/\*\*(.*?)\*\*/.test(line)) {
        return (
          <p key={index} className="mb-1">
            {line
              .split(/\*\*(.*?)\*\*/)
              .map((part, i) =>
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
          </p>
        );
      }

      if (/^\* /.test(line.trim())) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line.replace(/^\* /, "")}
          </li>
        );
      }

      return (
        <p key={index} className="mb-1">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8 py-6 bg-white/5 border border-white/10 rounded-xl w-full max-w-5xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
        🤖 Ask about your recommendations
      </h2>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto text-white text-sm sm:text-base mb-6 pr-2 hide-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`inline-block px-4 py-3 rounded-xl max-w-xs sm:max-w-xl whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-black/20 text-right"
                  : "bg-white/10 text-left"
              }`}
            >
              {msg.sender === "bot" ? renderMessage(msg.text) : msg.text}
            </div>
          </div>
        ))}

        {loading && <div className="text-gray-400">Typing...</div>}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded bg-white/10 text-white border border-white/20 focus:outline-none text-base"
          placeholder="Ask why this policy was recommended..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#fcc860] text-black px-4 py-2 sm:px-6 sm:py-2 rounded font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
