import { isStale } from './_logic';

/**
 * @typedef {{get: (id: string) => Promise<{practiced: import('../types').Practice[]}>}} SkillReader
 */

/**
 * @param {SkillReader | null | undefined} db
 * @param {{id: string}} params
 */
export default async (db, { id }) => {
	if (!db) return null;

	try {
		const { practiced } = await db.get(`skills/${id}`);
		const validPractices = practiced.filter(({ correct }) => correct === undefined || correct > 0);

		if (validPractices.length === 0) {
			return { started: false, stale: null, progress: 0 };
		}

		const progress = validPractices.reduce(
			(acc, { correct, skipped }) => acc + (correct || 1) / ((correct || 1) + (skipped || 0)),
			0
		);

		return {
			started: validPractices.length >= 1,
			stale: isStale({ practices: practiced }),
			progress
		};
	} catch {
		return { started: false, stale: null, progress: 0 };
	}
};
