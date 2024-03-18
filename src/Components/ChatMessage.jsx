import React from 'react';
import './css.css';

function ChatMessage({ message, isUserMessage, documents = [], links = [] }) {
    const messageClass = isUserMessage ? 'user-message' : 'incoming-message';

    return (
        <div className={`chat-message ${messageClass}`}>
            <pre>{message}</pre>
            {!isUserMessage && links.length > 0 && (
                <>
                    <div className='bold'>Links</div>
                    <div className='flex'>
                        {links.map((link, index) => (
                            <a href={link.url} className='link' key={index} target="_blank" rel="noopener noreferrer">
                                {link.name}
                            </a>
                        ))}
                    </div>

                </>
            )}
            {!isUserMessage && documents.length > 0 && (
                <>
                    <div className='bold'>Original documents</div>
                    <div className='flex'>
                        {documents.map((document, index) => (
                            <a href={document.url} className='link' key={index} target="_blank" rel="noopener noreferrer">
                                {document.name}
                            </a>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatMessage;
