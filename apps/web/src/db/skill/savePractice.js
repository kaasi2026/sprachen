/**
 * @param {PouchDB.Database<import('../types').SkillDocument>} db
 * @param {string} _id
 */
const getCurrentData = async (db, _id) => {
	try {
		return await db.get(_id);
	} catch {
		return {
			_id,
			practiced: []
		};
	}
};

/**
 * @param {PouchDB.Database<import('../types').SkillDocument>} db
 * @param {{id: string; correct: number; incorrect: number; skipped?: number}} practice
 */
export default async (db, { id, correct, incorrect, skipped }) => {
	const doc = await getCurrentData(db, `skills/${id}`);

	await db.put({
		...doc,
		practiced: [
			...doc.practiced,
			{
				at: new Date().valueOf(),
				correct,
				incorrect,
				skipped: skipped || 0
			}
		]
	});
};
