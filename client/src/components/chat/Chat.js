import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { userId } = useParams();  // get userId from URL
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/api/messages/${userId}`);
      setMessages(res.data);
    };
    if (userId) fetchMessages();
  }, [userId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const res = await axios.post('/api/messages', { receiver: userId, text });
    setMessages([...messages, res.data]);
    setText('');
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender === userId ? 'Them' : 'You'}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
