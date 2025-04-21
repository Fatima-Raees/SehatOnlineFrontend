// 'use client';
// import { useState } from 'react';

// export default function Chatbot() {
//   const [input, setInput] = useState('');
//   const [chat, setChat] = useState([]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: 'user', text: input };
//     setChat((prev) => [...prev, userMessage]);
//     setInput('');
//     console.log("Submitting...")
//     try {
//       const res = await fetch('/api/diagnose', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage.text }),
//       });

//       const data = await res.json();
//       console.log("Response received", data)
//       const botMessage = {
//         sender: 'bot',
//         text: data.reply || 'Sorry, I could not understand that.',
//       };

//       setChat((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setChat((prev) => [
//         ...prev,
//         { sender: 'bot', text: 'Something went wrong. Please try again.' },
//       ]);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <div className="mb-4 space-y-2">
//         {chat.map((msg, idx) => (
//           <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
//             <span
//               className={`inline-block p-2 rounded ${
//                 msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'
//               }`}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <input
//         className="border w-full p-2 rounded"
//         value={input}
//         onChange={handleInputChange}
//         placeholder="Describe your symptoms..."
//       />
//       <button
//         onClick={sendMessage}
//         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Send
//       </button>
//     </div>
//   );
// }





// 'use client';
// import { useState, useRef, useEffect } from 'react';

// export default function Chatbot() {
//   const [input, setInput] = useState('');
//   const [chat, setChat] = useState([]);
//   const chatContainerRef = useRef(null);

//   // Auto-scroll to the bottom of the chat
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chat]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: 'user', text: input };
//     setChat((prev) => [...prev, userMessage]);
//     setInput('');

//     try {
//       const res = await fetch('/api/diagnose', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: userMessage.text }),
//       });

//       const data = await res.json();
//       const botMessage = {
//         sender: 'bot',
//         text: data.reply || 'Sorry, I could not understand that.',
//       };

//       setChat((prev) => [...prev, botMessage]);
//     } catch (error) {
//       setChat((prev) => [
//         ...prev,
//         { sender: 'bot', text: 'Something went wrong. Please try again.' },
//       ]);
//     }
//   };

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-lg bg-white rounded-xl shadow-lg flex flex-col h-[80vh]">
//         {/* Chat Header */}
//         <div className="bg-blue-600 text-white p-4 rounded-t-xl">
//           <h1 className="text-lg font-semibold">HealthBot</h1>
//           <p className="text-sm">Describe your symptoms, and I’ll assist you.</p>
//         </div>

//         {/* Chat Messages */}
//         <div
//           ref={chatContainerRef}
//           className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
//         >
//           {chat.length === 0 ? (
//             <div className="text-center text-gray-500 mt-10">
//               Start by describing your symptoms...
//             </div>
//           ) : (
//             chat.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`flex ${
//                   msg.sender === 'user' ? 'justify-end' : 'justify-start'
//                 }`}
//               >
//                 <div
//                   className={`max-w-[70%] p-3 rounded-lg transition-all duration-300 ${
//                     msg.sender === 'user'
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-200 text-gray-800'
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Input Area */}
//         <div className="p-4 border-t bg-white flex items-center space-x-2">
//           <input
//             className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             value={input}
//             onChange={handleInputChange}
//             onKeyPress={handleKeyPress}
//             placeholder="Describe your symptoms..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







'use client';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, isLoading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setChat((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();
      const botMessage = {
        sender: 'bot',
        text: data.reply || 'Sorry, I could not understand that.',
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: 'bot', text: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied to clipboard!');
  };

  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col h-[85vh] transition-all duration-300">
        {/* Chat Header */}
        <div className="bg-[#1F4386] text-white p-6 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#0077B6] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">HealthBot</h1>
              <p className="text-sm opacity-80">Your personal health assistant</p>
            </div>
          </div>
          <button
            onClick={() => setChat([])}
            className="text-sm opacity-80 hover:opacity-100 transition"
          >
            Clear Chat
          </button>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50"
        >
          {chat.length === 0 && !isLoading ? (
            <div className="text-center text-gray-600 mt-12">
              <p className="text-lg">Start by describing your symptoms...</p>
            </div>
          ) : (
            <>
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  } animate-slide-in`}
                >
                  <div className="flex items-start space-x-2">
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 bg-[#0077B6] rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm font-bold">H</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[65%] p-4 rounded-xl shadow-sm transition-all duration-300 relative group ${
                        msg.sender === 'user'
                          ? 'bg-[#0077B6] text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <button
                        onClick={() => copyToClipboard(msg.text)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-xs text-gray-500 hover:text-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-slide-in">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-[#0077B6] rounded-full flex items-center justify-center mt-1">
                      <span className="text-white text-sm font-bold">H</span>
                    </div>
                    <div className="max-w-[65%] p-4 rounded-xl shadow-sm bg-gray-200 text-gray-800">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white flex items-center space-x-3">
          <input
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0077B6] transition text-gray-800"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Describe your symptoms..."
          />
          <button
            onClick={sendMessage}
            className="bg-[#0077B6] text-white p-3 rounded-lg hover:bg-[#1F4386] transition flex items-center justify-center"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}