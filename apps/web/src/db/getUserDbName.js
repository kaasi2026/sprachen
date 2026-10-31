/** @param {string} username */
const hashUsername = (username) =>
	username
		.split('')
		.map((c) => c.charCodeAt(0).toString(16))
		.join('');

/** @param {string} username */
export default (username) => `userdb-${hashUsername(username)}`;
