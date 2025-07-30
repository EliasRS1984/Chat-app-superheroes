import React from 'react'
import { useState } from 'react'
import './NewMessageForm.css'

const NewMessageForm = ({ addNewMessage }) => {
    const [messageText, setMessageText] = useState('');

    const handleSubmitSendMessageForm = (event) => {
        event.preventDefault();

        if (messageText.trim() === '') { 
            return; 
        }

        addNewMessage(messageText); 
        setMessageText('');
    };

    const handleInputChange = (event) => {
        setMessageText(event.target.value); 
    };

    return (
        <form onSubmit={handleSubmitSendMessageForm} className="message-form-container">
            <div>
                <label htmlFor="message">Escribe un mensaje:</label>
                <input
                    type="text"
                    placeholder='Escribe un mensaje...'
                    id='message'
                    name='message'
                    required
                    value={messageText} 
                    onChange={handleInputChange} 
                />
            </div>
            <button type='submit'>Enviar mensaje</button>
        </form>
    );
};

export default NewMessageForm;