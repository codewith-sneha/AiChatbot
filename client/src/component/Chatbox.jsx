import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets';
import Message from './Message';
import toast from 'react-hot-toast';

const Chatbox = () => {
  const { selectedChat, user, axios, token } = useAppContext();
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth", // ✅ fixed typo
      });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) return toast("Login to send message");

      setLoading(true);
      const promptCopy = prompt;
      setPrompt("");
      setMessages(prev => [...prev, { role: "user", content: prompt, timestamp: Date.now() }]);

      const { data } = await axios.post(
        `/api/message`,
        { chatId: selectedChat._id, prompt },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessages(prev => [...prev, data.reply]);
      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full sm:relative sm:flex-1 px-3 md:px-10 xl:px-30 2xl:pr-40">
      
      {/* Chat messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto mb-3 flex flex-col gap-3"
      >
        {messages.length === 0 && (
          <div className="flex flex-col gap-3 justify-center items-center h-full">
            <div className="flex gap-3 items-center mt-20">
              <img src={assets.Gptlogo} alt="" className="w-full max-w-18" />
              <p className="text-3xl">GPTify</p>
            </div>
            <p className="text-3xl text-gray-500">Ask me anything..</p>
          </div>
        )}

        {messages.map((message, i) => (
          <Message key={i} Message={message} />
        ))}

        {loading && (
          <p className="flex items-center gap-1.5 animate-pulse">
            AI is typing...
          </p>
        )}
      </div>

      {/* Input box */}
      <form
        className="flex gap-2 p-2 px-4 bg-amber-50 dark:invert border rounded-full border-gray-400 items-center sticky bottom-0"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          value={prompt}
          placeholder="Type your prompt here.."
          className="flex-1 text-sm outline-none text-black bg-transparent"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
        >
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className="h-8"
            alt=""
          />
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
