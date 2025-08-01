
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import ContactList from './Componentes/ContactList/ContactList';
import ChatScreen from './Componentes/ChatScreen/ChatScreen';
import './App.css';

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

const App = () => { 
	const { contact_id } = useParams();
	const isMobile = useMediaQuery('(max-width: 768px)');
	const navigate = useNavigate();

	const showContactList = !isMobile || (isMobile && !contact_id);
	const showChatScreen = !isMobile || (isMobile && contact_id);

	return (
		<>
			{showContactList && (
				<div className="contact-list-container">
					<ContactList />
				</div>
			)}

			{showChatScreen && (
				<div className="chat-screen-container">
					{isMobile && !contact_id ? (
						<div className="chat-placeholder">
							<h2>Selecciona un héroe para chatear</h2>
							<p>¡Elige a Iron Man o Spiderman de la lista!</p>
						</div>
					) : (
						<ChatScreen />
					)}
				</div>
			)}
		</>
	);
};

export default App;