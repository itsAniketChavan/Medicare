  import React, { useState } from 'react';
  

  const DoctorAppointmentBooking = () => {
    const [messages, setMessages] = useState([
      { id: 1, sender: 'bot', text: 'Welcome to the Doctor Appointment Booking System. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
      if (input.trim()) {
        setMessages([...messages, { id: messages.length + 1, sender: 'user', text: input }]);
        setInput('');
        // Add a mock bot response for demonstration
        setTimeout(() => {
          setMessages(messages => [...messages, { id: messages.length + 2, sender: 'bot', text: 'Your request has been received.' }]);
        }, 1000);
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500 p-4">
        <div className="bg-white shadow-2xl rounded-lg max-w-md w-full p-6">
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Doctor Appointment Booking</h1>
          <div className="overflow-y-auto h-64 mb-4 p-2 border rounded border-gray-300 space-y-2">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`relative max-w-xs px-4 py-2 text-white rounded-lg shadow ${
                    message.sender === 'bot' ? 'bg-blue-600' : 'bg-green-500'
                  } ${index === messages.length - 1 ? 'animate-pulse' : ''}`}
                >
                  {message.text}
                  <div className={`absolute bottom-0 left-0 h-3 w-3 transform translate-y-1/2 rotate-45 ${message.sender === 'bot' ? 'bg-blue-600' : 'bg-green-500'}`}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-l-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DoctorAppointmentBooking;
