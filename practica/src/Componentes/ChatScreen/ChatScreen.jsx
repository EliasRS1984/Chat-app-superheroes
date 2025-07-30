import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MessagesList from '../MessagesList/MessagesList';
import NewMessageForm from '../NewMessageForm/NewMessageForm';
import { getContactById, addNewMessage as serviceAddNewMessage, deleteMessageById as serviceDeleteMessageById, deleteAllMessages as serviceDeleteAllMessages } from '../Service/contactService';
import './ChatScreen.css';
import { FaArrowLeft } from 'react-icons/fa';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

const ChatScreen = () => {
    const { contact_id } = useParams();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');


    const [currentContact, setCurrentContact] = useState(null); 
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchedContact = getContactById(contact_id);

        if (!fetchedContact) {
            navigate('/');
            return;
        }

        setCurrentContact(fetchedContact);
        setMessages(fetchedContact.messages);

    }, [contact_id, navigate]);

    if (!currentContact) {
        return null;
    }

    const addNewMessage = (text) => {
        const newMessage = serviceAddNewMessage(contact_id, text);
        if (newMessage) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    };

    const deleteMessageById = (messageId) => {
        const updatedMessages = serviceDeleteMessageById(contact_id, messageId);
        setMessages(updatedMessages);
    };

    const deleteAllMessages = () => {
        const updatedMessages = serviceDeleteAllMessages(contact_id);
        setMessages(updatedMessages);
    };

    return (
        <div className="chat-screen-container">
            {isMobile && (
                <button onClick={() => navigate('/')} className="back-button">
                    <FaArrowLeft /> Atrás
                </button>
            )}
            <h1>Mensajes con {currentContact.name}:</h1> 
            <MessagesList
                messages={messages}
                deleteMessageById={deleteMessageById}
                contactAvatar={currentContact.avatar} 
            />
            <NewMessageForm addNewMessage={addNewMessage} />
            <button onClick={deleteAllMessages}>Borrar todos los mensajes</button>
        </div>
    );
};

export default ChatScreen;