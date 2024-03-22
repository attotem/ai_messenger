import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { ThreeDots } from 'react-loader-spinner';
import './css.css';
import logo from "./logo.svg"
import { createThread, addMessage } from '../config';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [thread_id, setThread_id] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        createThread()
            .then(data => {
                console.log(data);
                setThread_id(data.thread_id)
            })
            .catch(error => {
                console.error("Error creating thread:", error);
            });
    }, []);

    const handleSendMessage = (newMessage) => {
        setMessages(prevMessages => [...prevMessages, { text: newMessage, isUserMessage: true }]);
        setIsLoading(true);

        addMessage(newMessage, thread_id)
            .then(data => {
                console.log(data);
                setIsLoading(false);
                setMessages(prevMessages => [...prevMessages, {
                    text: data.res,
                    isUserMessage: false,
                    documents: data.original_documents,
                    links: data.links,
                }]);
            })
            .catch(error => {
                console.error("Error adding message:", error);
                setIsLoading(false);
            });
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-container">
            <img src={logo} className='logo'></img>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        message={message.text}
                        isUserMessage={message.isUserMessage}
                        links={message.links}
                        documents={message.documents}
                    />
                ))}
                {isLoading &&
                    < ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="#c6c6c6"
                        radius="8"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};
export default Chat;
