const USERS_COLLECTION_NAME = 'usersName';
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

	static getFromCollection = (collectionName) => {
		return JSON.parse(localStorage.getItem(collectionName)) || [];
	}

	static setInCollection = (collectionName, somethingToWrite) => {
		localStorage.setItem(collectionName, JSON.stringify(somethingToWrite));
	}

	static getUsers = () => {
		return DBManager.getFromCollection(USERS_COLLECTION_NAME);
	}

	static setUsers = (somethingToWrite) => {
		const usersString = DBManager.setInCollection(USERS_COLLECTION_NAME, somethingToWrite);
	}

	static getAgents = () => {
		return DBManager.getFromCollection(AGENTS_COLLECTION_NAME);
	}

	static setAgents = (somethingToWrite) => {
		const usersString = DBManager.setInCollection(AGENTS_COLLECTION_NAME, somethingToWrite);
	}

	static getMessages = () => {
		return DBManager.getFromCollection(MESSAGES_COLLECTION_NAME);
	}

	static setMessages = (somethingToWrite) => {
		const messagesString = DBManager.setInCollection(MESSAGES_COLLECTION_NAME, somethingToWrite);
	}

	static getCurrentUser = () => {
		return DBManager.getSingleItem(CURRENT_USER);
	}

	static setCurrentUser = (newUser) => {
		DBManager.setSingleItem(CURRENT_USER, newUser);
	}
}

export default DBManager;