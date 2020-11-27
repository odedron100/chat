import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBEbDR2aZ7KnkdbY0qEmc8essiDqi2nBjw",
    authDomain: "chat-9b1a6.firebaseapp.com",
    databaseURL: "https://chat-9b1a6.firebaseio.com",
    projectId: "chat-9b1a6",
    storageBucket: "chat-9b1a6.appspot.com",
    messagingSenderId: "413541985347",
    appId: "1:413541985347:web:12063ffba5ceb23976f8f6",
    measurementId: "G-6TQGQDZH0M"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

const USERS_COLLECTION_NAME = 'users';
const AGENTS_COLLECTION_NAME = 'agents';
const MESSAGES_COLLECTION_NAME = 'messages';
const CURRENT_USER = 'currentUser';
const CURRENT_AGENT = 'currentAgent';
const ONLINE_AGENT = 'onlineAgent';

class DBManager {
	static getSingleItem = (itemName) => {
		return JSON.parse(localStorage.getItem(itemName));
	}

	static setSingleItem = (itemName, newItem) => {
		localStorage.setItem(itemName, JSON.stringify(newItem));
	}


	static getUsers = () => {	
		const promise = database.ref(USERS_COLLECTION_NAME).once('value').then((snap) => {
			return snap.val();
		})
		return promise;
	}

	static getUser = (id) => {
		const promise = database.ref(`${USERS_COLLECTION_NAME}/${id}`).once('value').then((snap) => {
			const user = snap.val();

			if (!user) {
				throw new Error("User not found!");
			}
			return {...user, id};
		});

		return promise;
	}

	static setUsers = (users) => {
		database.ref(USERS_COLLECTION_NAME).set(users).then(() => {
		});
	}

	static createNewUser = (user) => {
		return database.ref(USERS_COLLECTION_NAME).push(user).then((snap) => {
			return {
				...user,
				id: snap.key
			};
		});


	}

	static getAgents = () => {
		return DBManager.getFromCollection(AGENTS_COLLECTION_NAME);
	}

	static setAgents = (somethingToWrite) => {
		DBManager.setInCollection(AGENTS_COLLECTION_NAME, somethingToWrite);
	}

	static registerToNewMessages = (userId, onNewMessageAdded) => {
		// console.log('register....', `chats/${userId}/${MESSAGES_COLLECTION_NAME}`);
		database.ref(`chats/${userId}/${MESSAGES_COLLECTION_NAME}`).on('value', (snap) => {
			onNewMessageAdded(
					snap.val()
				);
		});
	}

	// static getMessages = (userId) => {
	// 	const promise = database.ref(`chats/${userId}/${MESSAGES_COLLECTION_NAME}`).once('value').then((snap) => {
	// 		return snap.val();
	// 	})
	// 	return promise;
	// }

	static setMessages = (userId, messages) => {
		return database.ref(`chats/${userId}/${MESSAGES_COLLECTION_NAME}`).set(messages);
	}

	static getCurrentUser = () => {
		return DBManager.getSingleItem(CURRENT_USER);
	}

	static getCurrentAgent = () => {
		return DBManager.getSingleItem(CURRENT_AGENT);
	}

	static setCurrentUser = (newUser) => {
		DBManager.setSingleItem(CURRENT_USER, newUser);
	}

	static setCurrentAgent = (newAgent) => {
		DBManager.setSingleItem(CURRENT_AGENT, newAgent);
	}

	static loginWithEmailAndPassword = (email, password) => {
		return firebase.auth().signInWithEmailAndPassword(
		    email,
		    password
		);
	}

	// static setOnlineAgent = (email) =>{
	// 	database.ref(ONLINE_AGENT).set(email).then(() => {
	// 	});
	// }

	static setOnlineAgent = (agent) => {
		return database.ref(ONLINE_AGENT).set(agent);
	}

	static getOnlineAgent = (onAgentLogin) => {		
		database.ref(ONLINE_AGENT).on('value', (snap) => {
			onAgentLogin(
			 snap.val()
			); 
		});
	}


	static createNewAgentUser = (user) => {
		const {email, fullname, password} = user;

		return firebase.auth().createUserWithEmailAndPassword(
		  email,
		  password
		)
		  .catch(function(error) {
		    console.log('Error creating new user:', error.cose);
		    console.log(error);
		  });
	}
}

export default DBManager;