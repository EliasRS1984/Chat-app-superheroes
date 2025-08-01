
import React from 'react';
import Message from '../Message/Message';
import './MessagesList.css';

const MessagesList = ({ messages, deleteMessageById, contactAvatar }) => { 
    return (
        <div className="messages-list-container">
            {messages && messages.length > 0 ? (
                messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                        deleteMessageById={deleteMessageById}
                        otherAvatar={message.emisor === 'OTRO' ? contactAvatar : undefined}
                    />
                ))
            ) : (
                <p className="no-messages-placeholder">¡Envía el primer mensaje a tu superhéroe!</p>
            )}
        </div>
    );
};

export default MessagesList;