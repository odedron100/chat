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
const UN_READ_MESSAGES = 'unReadMessages';

class DBManager {
	static getSingleItem = (itemName) => {
		return JSON.parse(localStorage.getItem(itemName));
	}

	static setSingleItem = (itemName, newItem) => {
		localStorage.setItem(itemName, JSON.stringify(newItem));
	}


	static getUsers = (onNewUserAdded) => {	
		database.ref(USERS_COLLECTION_NAME).on('value', (snap) => {
			onNewUserAdded(
				snap.val()
			);
		});	
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
		return database.ref(USERS_COLLECTION_NAME).set(users);
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

	static setMessages = (userId, messages) => {
		return database.ref(`chats/${userId}/${MESSAGES_COLLECTION_NAME}`).set(messages);
	}

	static setUnReadMessages = (userId, messages) => {
		return database.ref(`chats/${userId}/${UN_READ_MESSAGES}`).set(messages);
	}

	static getUnReadMessages = (userId, onNewMessageAdded) => {
		// console.log('register....', `chats/${userId}/${MESSAGES_COLLECTION_NAME}`);
		database.ref(`chats/${userId}/${UN_READ_MESSAGES}`).on('value', (snap) => {
			onNewMessageAdded(
					snap.val()
				);
		});
	}

	static getIsUserLoggedIn = (callback) => {
		firebase.auth().onAuthStateChanged(callback);
		// https://firebase.google.com/docs/auth/web/manage-users
		// firebase.auth().onAuthStateChanged(function(user) {
		//   if (user) {
		//     // User is signed in.
		//   } else {
		//     // No user is signed in.
		//   }
		// });
	}

	// DBManager.getIsUserLoggedIn((user) => {
	// 	if (user) {
	// 		// DBManager.getUser(user.id.....)
	// 	} else {
	// 		// Redurect to login
	// 	}
	// })

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

	static getAgent = (agentEmail) => {
		// get all agents ->
		// return agents.find(agent.email === agentEmail)
	}


	static createNewAgentUser = (agent) => {
		const {email, fullname, password} = agent;

		return firebase.auth().createUserWithEmailAndPassword(
		  email,
		  password
		).then(() => {
			database.ref('agents').push({email, fullname});
		})
		  .catch(function(error) {
		    console.log('Error creating new user:', error.cose);
		    console.log(error);
		  });
	}
}

export default DBManager;