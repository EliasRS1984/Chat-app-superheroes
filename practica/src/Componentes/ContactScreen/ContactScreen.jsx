import React, { useState } from 'react';
import ContactList from '../ContactList/ContactList';
import { getContactList } from '../Service/contactService';
import './ContactScreen.css'




const ContactScreen = () => {
    const contacts = getContactList()
    const [contactsState, setContactsState] = useState(contacts);

    return (
        <div className="contact-screen-container">
            <ContactList contacts={contactsState} />
        </div>
    );
};

export default ContactScreen;
