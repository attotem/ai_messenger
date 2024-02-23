import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import './css.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [thread_id, setThread_id] = useState();
    const messagesEndRef = useRef(null);

    const handleSendMessage = (newMessage) => {
        setMessages(prevMessages => [...prevMessages, { text: newMessage, isUserMessage: true }]);
        console.log(newMessage)

        fetch("https://webhoooks-dmitrykarpov.pythonanywhere.com/add_message", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: newMessage,
                thread_id: thread_id,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMessages(prevMessages => [...prevMessages, { text: data.answer, isUserMessage: false }]);

            })
            .catch(error => { console.error("Error fetching data:", error); })
    };

    useEffect(() => {
        fetch("https://webhoooks-dmitrykarpov.pythonanywhere.com/create_thread", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            }),
            cache: "no-cache"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setThread_id(data.thread_id)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message.text} isUserMessage={message.isUserMessage} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};
export default Chat;
