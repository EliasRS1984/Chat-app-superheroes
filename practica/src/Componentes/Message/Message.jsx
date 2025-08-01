
import React from 'react';
import './Message.css';
import { FaTrash } from 'react-icons/fa'; 

const Message = ({ message, deleteMessageById, otherAvatar }) => {
    const messageClass = message.emisor === 'YO' ? 'my-message' : 'other-message';

    let avatarSrc = ''; 

    if (message.emisor === 'YO') {
        avatarSrc = 'https://makerworld.bblmw.com/makerworld/model/USf25d06bcfb597/design/2025-02-04_56469dcc2a279.png?x-oss-process=image/resize,w_1000/format,webp'; // URL del Capitán América
    } else { 
        
        avatarSrc = otherAvatar;
    }

    if (!avatarSrc) {
        console.warn("AvatarSource está vacío para el emisor:", message.emisor, "Mensaje:", message.texto);
        avatarSrc = 'https://via.placeholder.com/40/CCCCCC/000000?text=NA'; 
    }

    return (
        <div className={`message-container ${messageClass}`}>
            {message.emisor === 'OTRO' && avatarSrc && (
                <img src={avatarSrc} alt="Avatar de contacto" className="message-avatar" />
            )}

            <div className="message-bubble">
                <p>{message.texto}</p>
                <div className="message-info">
                    <span>{message.hora}</span>
                    <button
                        onClick={() => deleteMessageById(message.id)}
                        className="delete-button"
                    >
                        <FaTrash /> 
                    </button>
                </div>
            </div>

            {message.emisor === 'YO' && avatarSrc && (
                <img src={avatarSrc} alt="Tu avatar" className="message-avatar" />
            )}
        </div>
    );
};

export default Message;