import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { getContactList } from '../Service/contactService'; 
import './ContactList.css'; 

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchedContacts = getContactList();
        setContacts(fetchedContacts);
    }, []); 

    return (
        <div className="contact-list-container">
            <h1>Contactos</h1>
            <div className="contact-items">
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <Link to={`/chat/${contact.id}`} key={contact.id} className="contact-item">
                            <div className="contact-avatar-wrapper">
                                <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
                                {contact.connectionStatus === 'online' && <span className="online-indicator"></span>}
                            </div>
                            <div className="contact-info">
                                <h3 className="contact-name">{contact.name}</h3>
                            </div>
                            <div className="contact-status">
                                <span className="contact-last-connection">{contact.lastConnection}</span>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No hay contactos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ContactList;