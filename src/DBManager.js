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

console.log('firebase', firebase);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

const USERS_COLLECTION_NAME = 'users';
const AGENTS_COLLECTION_NAME = 'agents';
const MESSAGES_COLLECTION_NAME = 'messages';
const CURRENT_USER = 'currentUser';

class DBManager {
	static getSingleItem = (itemName) => {
		return JSON.parse(localStorage.getItem(itemName));
	}

	static setSingleItem = (itemName, newItem) => {
		localStorage.setItem(itemName, JSON.stringify(newItem));
	}

	// static getFromCollection = (collectionName) => {
	// 	return JSON.parse(localStorage.getItem(collectionName)) || [];
	// }

	// static setInCollection = (collectionName, somethingToWrite) => {
	// 	localStorage.setItem(collectionName, JSON.stringify(somethingToWrite));
	// }

	static getUsers = () => {
		// return DBManager.getFromCollection(USERS_COLLECTION_NAME);
		
		const promise = database.ref(USERS_COLLECTION_NAME).once('value').then((snap) => {
			return snap.val();
		})

		return promise;
	}

	static getUser = (id) => {
		const promise = database.ref(`${USERS_COLLECTION_NAME}/${id}`).once('value').then((snap) => {
			const user = snap.val();

			if (!user) {
				throw "User not found!";
			}

			return {...user, id};
		});

		return promise;
	}

	static setUsers = (users) => {
		// DBManager.setInCollection(USERS_COLLECTION_NAME, users);

		database.ref(USERS_COLLECTION_NAME).set(users).then(() => {

		});

	}

	static createNewUser = (user) => {
		// DBManager.setInCollection(USERS_COLLECTION_NAME, users);
		// console.log('users', users);

		database.ref(USERS_COLLECTION_NAME).push(user).then(() => {
			console.log('completed');
		});
		// console.log('waiting');

	}

	static getAgents = () => {
		return DBManager.getFromCollection(AGENTS_COLLECTION_NAME);
	}

	static setAgents = (somethingToWrite) => {
		DBManager.setInCollection(AGENTS_COLLECTION_NAME, somethingToWrite);
	}

	static getMessages = () => {
		// return DBManager.getFromCollection(MESSAGES_COLLECTION_NAME);
		const promise = database.ref(MESSAGES_COLLECTION_NAME).once('value').then((snap) => {
			return snap.val();
		})

		return promise;
	}

	static setMessages = (messages) => {
		// DBManager.setInCollection(MESSAGES_COLLECTION_NAME, somethingToWrite);
		database.ref(MESSAGES_COLLECTION_NAME).set(messages);
	}

	static getCurrentUser = () => {
		return DBManager.getSingleItem(CURRENT_USER);
	}

	static setCurrentUser = (newUser) => {
		DBManager.setSingleItem(CURRENT_USER, newUser);
	}
}

export default DBManager;