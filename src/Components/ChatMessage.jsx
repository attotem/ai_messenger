import React, { useEffect } from 'react';
import './css.css';

function ChatMessage({ message, isUserMessage, documents = [], links = [] }) {
    const messageClass = isUserMessage ? 'user-message' : 'incoming-message';

    return (
        <div className={`chat-message ${messageClass}`}>
            <div>{message}</div>
            {!isUserMessage && links.length > 0 && (
                <>
                    <div>Links</div>
                    {links.map((link, index) => (
                        <div className='link' key={index}>{link}</div>
                    ))}
                </>
            )}
            {!isUserMessage && documents.length > 0 && (
                <>
                    <div>Original documents</div> {/* Updated label */}
                    {documents.map((document, index) => (
                        <div className='link' key={index}>{document}</div>
                    ))}
                </>
            )}
        </div>
    );
};

export default ChatMessage;
