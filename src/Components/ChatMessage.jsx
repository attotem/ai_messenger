import React from 'react';
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
                        <a href={link} className='link' key={index} target="_blank" rel="noopener noreferrer">
                            {link}
                        </a>
                    ))}
                </>
            )}
            {!isUserMessage && documents.length > 0 && (
                <>
                    <div>Original documents</div>
                    {documents.map((document, index) => (
                        <a href={document} className='link' key={index} target="_blank" rel="noopener noreferrer">
                            {document}
                        </a>
                    ))}
                </>
            )}
        </div>
    );
};

export default ChatMessage;
