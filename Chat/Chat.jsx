import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [customerId, setCustomerId] = useState('');
    const messagesEndRef = useRef(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const socketRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const getOrCreateCustomerId = () => {
        let id = localStorage.getItem('customerId');
        if (!id) {
            id = `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('customerId', id);
        }
        return id;
    };

    useEffect(() => {
        const id = getOrCreateCustomerId();
        setCustomerId(id);

        socketRef.current = io('http://localhost:5000', {
            withCredentials: true,
            transports: ['websocket'],
            query: { customerId: id }
        });

        socketRef.current.on('connect', () => {
            setIsConnected(true);
            console.log('Connected with ID:', id);
            socketRef.current.emit('joinRoom', id);

            // Request message history immediately after connection
            socketRef.current.emit('requestMessageHistory', { customerId: id });
        });

        socketRef.current.on('disconnect', () => {
            setIsConnected(false);
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('Connection error:', err);
            setIsLoading(false);
        });

        socketRef.current.on('receiveMessage', (data) => {
            if (data.customerId === id) {
                const newMsg = {
                    id: `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                    sender: data.message.sender,
                    text: data.message.text,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                setMessages(prev => {
                    const updated = [...prev, newMsg];
                    return updated.filter((msg, index, self) =>
                        index === self.findIndex(m =>
                            m.text === msg.text && m.time === msg.time && m.sender === msg.sender
                        )
                    );
                });
                setIsLoading(false);
                scrollToBottom();
            }
        });

        socketRef.current.on('messageHistory', (history) => {
            if (Array.isArray(history)) {
                const uniqueHistory = history.map(msg => ({
                    ...msg,
                    time: new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setMessages(uniqueHistory);
                setIsLoading(false);
                scrollToBottom();
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !isConnected) return;

        const userMessage = {
            id: `${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            sender: 'user',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);

        socketRef.current.emit('sendMessage', {
            customerId: customerId,
            message: newMessage,
            sender: 'user'
        });

        setNewMessage('');
        scrollToBottom();
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ scrollBehavior: "auto" }} className="flex justify-end h-fit items-end rounded-3xl">
            <div className="relative right-6 w-full max-w-md bg-white rounded-md flex flex-col">
                {/* Header with toggle button */}
                <div
                    className="p-4 bg-blue-600 text-white rounded-md cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Chat with Admin</h2>
                        <div className="flex items-center">
                            <div className={`flex items-center mr-4 ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
                                <span className="mr-2 ml-2">{isConnected ? 'Connected' : 'Disconnected'}</span>
                                <span className="text-xl">{isConnected ? '🟢' : '🔴'}</span>
                            </div>
                            <span className="text-xl">
                                {isExpanded ? '▼' : '▲'}
                            </span>
                        </div>
                    </div>
                    {isExpanded && <div className="text-sm mt-1">Your ID: {customerId}</div>}
                </div>
                {isExpanded && (
                    <>
                        {/* Messages */}
                        <div
                            className="px-4 py-3 rounded-3xl overflow-y-auto"
                            style={{ height: '300px', scrollBehavior: 'smooth' }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    No messages yet. Start the conversation!
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <div
                                        key={`${msg.id}-${index}`}
                                        className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-800 text-black' : 'bg-gray-200 text-gray-800'}`}>
                                            <div className="text-sm">{msg.text}</div>
                                            <div className="text-xs mt-1 text-right opacity-70">
                                                {msg.time} {msg.sender === 'user' ? '• You' : '• Admin'}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 border-t rounded-3xl bg-white">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder={isConnected ? 'Type your message...' : 'Connecting...'}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    disabled={!isConnected}
                                />
                                <button
                                    type="submit"
                                    className={`px-4 py-2 rounded-r-lg font-medium ${isConnected && newMessage.trim()
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                    disabled={!isConnected || !newMessage.trim()}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}