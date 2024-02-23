import React from 'react';
import './css.css';

function ChatMessage({ message, isUserMessage }) {
    const messageClass = isUserMessage ? 'user-message' : 'incoming-message';
    return (
        <div className={`chat-message ${messageClass}`}>
            <div>{message}</div>
        </div>
    );
};
export default ChatMessage