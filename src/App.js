import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";
import HomePage from "./components/HomePage";
import "./styles/App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home"); // 'home' or 'chat'
  const [messages, setMessages] = useState([
    { sender: "bot", text: "✨ Welcome to SkinSense AI! Ask me about skincare routines, home remedies, or self-care tips. What's your skin type today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    setMessages([...messages, { sender: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: "bot", text: data.text }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." }
      ]);
    }
    setLoading(false);
  };

  const handleGetStarted = () => {
    setCurrentPage("chat");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  const handleNewChat = () => {
    setMessages([
      { sender: "bot", text: "✨ Welcome to SkinSense AI! Ask me about skincare routines, home remedies, or self-care tips. What's your skin type today?" }
    ]);
    // Reset backend chat session
    fetch("http://localhost:5000/api/new-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).catch(err => console.error("Error resetting chat:", err));
  };

  if (currentPage === "home") {
    return <HomePage onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="app-container">
      <div className="chat-header">
        <button className="back-btn" onClick={handleBackToHome}>← Back to Home</button>
        <h1 className="chat-title">✨ SkinSense AI - Your Beauty Advisor</h1>
        <button className="new-chat-btn" onClick={handleNewChat}>+ New Chat</button>
      </div>
      <ChatWindow messages={messages} />
      <InputBox onSend={handleSend} disabled={loading} />
    </div>
  );
}

export default App;