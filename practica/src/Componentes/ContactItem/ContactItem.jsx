import React from 'react';
import './ContactItem.css'
import { Link } from 'react-router';

const ContactItem = ({ contact }) => {
    return (
    <Link to={`/contact/${contact.id}/messages`} className="contact-item"> 
        <h2>{contact.name}</h2>
        <img src={contact.avatar} alt={contact.name} width={100} />
        <span>Last Connection: {contact.lastConnection}</span>
        <span>Connection Status: {contact.connectionStatus}</span>
    </Link>
);
    
};

export default ContactItem;