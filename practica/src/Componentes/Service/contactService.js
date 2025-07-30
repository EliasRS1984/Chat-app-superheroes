
let contactsData = [
    {
        id: 1,
        name: 'Iron Man', 
        description: 'Solo vives una vez, pero no te olvides de mi',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUwW2SNxdf2ouxGJgkrd02vW2-DoncXt4dvZ05z8PpW8d_YDoT3wYyEMUnVNbU1LdXX8&usqp=CAU', 
        lastConnection: '15:23',
        connectionStatus: 'offline',
        messages: [
            {
                emisor: 'YO',
                hora: '23:10',
                id: 1,
                texto: 'Hola estoy hablando con Iron Man',
                status: 'visto'
            },
            {
                emisor: 'OTRO',
                hora: '23:11',
                id: 2,
                texto: 'Si, el que usa armadura',
                status: 'visto'
            },
            {
                emisor: 'YO',
                hora: '23:12',
                id: 3,
                texto: 'Todo esta bien?',
                status: 'visto'
            },
            {
                emisor: 'OTRO',
                hora: '23:16',
                id: 3,
                texto: 'Soy Tony Stark, nada puede "malir-sal"',
                status: 'visto'
            }
        ]
    },
    {
        id: 2,
        name: 'Spiderman', 
        description: 'rie ama y sueña',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVs9kr-V352fYaHKB71W6JLQV1k9W9L64mPg&st=0&sqi=2', 
        lastConnection: 'ahora',
        connectionStatus: 'online',
        messages: [
            {
                emisor: 'YO',
                hora: '23:10',
                id: 1,
                texto: 'Hola estoy hablando con Spiderman',
                status: 'visto'
            },
            {
                emisor: 'OTRO',
                hora: '23:11',
                id: 2,
                texto: 'Hola que tal telarañas?',
                status: 'visto'
            },
            {
                emisor: 'YO',
                hora: '23:12',
                id: 3,
                texto: 'Todo esta bien?',
                status: 'visto'
            }
        ]
    },
    {
        id: 3,
        name: 'Thor',
        description: 'Dios del Trueno con acento nórdico.',
        avatar: 'https://i.pinimg.com/1200x/8b/6c/9c/8b6c9c6b62c5df9e372c0c5d32e06a8b.jpg', 
        lastConnection: 'hace 30 min',
        connectionStatus: 'online',
        messages: [
            {
                emisor: 'YO',
                hora: '10:05',
                id: 1,
                texto: 'Thor, necesitamos tu ayuda!',
                status: 'visto'
            },
            {
                emisor: 'OTRO',
                hora: '10:06',
                id: 2,
                texto: 'Thanos, ya viene!?',
                status: 'visto'
            },
            {
                emisor: 'YO',
                hora: '10:07',
                id: 3,
                texto: 'No! se nos corto la luz y nos seria de mucha ayuda un dios del trueno.',
                status: 'visto'
            }
        ]
    },
    {
        id: 4,
        name: 'Hulk',
        description: '¡Hulk aplasta! Y a veces, piensa.',
        avatar: 'https://www.ifema.es/img/xl/increible-hulk/el-increible-hulk.jpeg', 
        lastConnection: 'ahora',
        connectionStatus: 'online',
        messages: [
            {
                emisor: 'YO',
                hora: '11:15',
                id: 1,
                texto: 'Hulk, ¿podrías por favor no usar el Quinjet como pelota de baloncesto? Es que cuesta un poco repararlo.',
                status: 'visto'
            },
            {
                emisor: 'OTRO',
                hora: '11:16',
                id: 2,
                texto: '¡HULK QUERÍA JUGAR! PEQUEÑO AVIÓN NO ES DIVERTIDO.',
                status: 'visto'
            },
            {
                emisor: 'YO',
                hora: '11:17',
                id: 3,
                texto: 'Claro, claro. Lo entiendo. Solo, la próxima vez, avísanos antes de lanzar un avión, ¿sí?',
                status: 'visto'
            }
        ]
    }
];

export const getContactList = () => {
    return JSON.parse(JSON.stringify(contactsData));
};

export const getContactById = (contact_id) => {
    const contact = contactsData.find(c => Number(c.id) === Number(contact_id));
    return contact ? JSON.parse(JSON.stringify(contact)) : null;
};

const getContactIndexById = (contact_id) => {
    return contactsData.findIndex(c => Number(c.id) === Number(contact_id));
};

export const addNewMessage = (contactId, text) => {
    const contactIndex = getContactIndexById(contactId);
    if (contactIndex === -1) return null; 

    const currentContact = contactsData[contactIndex];
    const newMessage = {
        id: Date.now(),
        texto: text,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emisor: 'YO',
        status: 'enviado'
    };

    const updatedMessages = [...currentContact.messages, newMessage];

    const updatedContact = { ...currentContact, messages: updatedMessages };

    contactsData = contactsData.map((c, index) =>
        index === contactIndex ? updatedContact : c
    );

    return newMessage;
};

export const deleteMessageById = (contactId, messageId) => {
    const contactIndex = getContactIndexById(contactId);
    if (contactIndex === -1) return [];

    const currentContact = contactsData[contactIndex];
    const updatedMessages = currentContact.messages.filter(msg => msg.id !== messageId);

    const updatedContact = { ...currentContact, messages: updatedMessages };

    contactsData = contactsData.map((c, index) =>
        index === contactIndex ? updatedContact : c
    );
    return updatedMessages;
};

export const deleteAllMessages = (contactId) => {
    const contactIndex = getContactIndexById(contactId);
    if (contactIndex === -1) return [];

    const currentContact = contactsData[contactIndex];
    const updatedMessages = []; 

    const updatedContact = { ...currentContact, messages: updatedMessages };

    contactsData = contactsData.map((c, index) =>
        index === contactIndex ? updatedContact : c
    );
    return updatedMessages;
};