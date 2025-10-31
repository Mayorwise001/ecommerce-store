import React, { useState } from "react";
import "../styles/SupportWidget.css";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const SupportWidget = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleToggle = () => setOpen(!open);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    alert("✅ Your message has been sent. We'll get back to you soon!");
    setMessage("");
    setOpen(false);
  };

  return (
    <>
      <div className="support-widget">
        {open && (
          <div className="support-chatbox">
            <div className="support-header">
              <h4>Need Help?</h4>
              <button className="close-btn" onClick={handleToggle}>
                <FaTimes />
              </button>
            </div>

            <div className="support-body">
              <p>Hi 👋, how can we help you today?</p>
              <form onSubmit={handleSubmit} className="support-form">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                ></textarea>
                <button type="submit" className="send-btn">
                  <FaPaperPlane />
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        <button className="chat-toggle" onClick={handleToggle}>
          {open ? <FaTimes /> : <FaComments />}
          {!open && <span>Need Help?</span>}
        </button>
      </div>
    </>
  );
};

export default SupportWidget;
