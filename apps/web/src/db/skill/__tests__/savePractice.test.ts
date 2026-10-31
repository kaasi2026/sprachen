import db from '../../db';
import savePractice from '../savePractice';

if (!db || !db.__reset) {
	throw new Error('The test database was not initialized.');
}

const testDb = db;
const resetDatabase = testDb.__reset;
if (!resetDatabase) {
	throw new Error('The test database reset function was not initialized.');
}

describe('db/skill/savePractice', () => {
	beforeEach(async () => {
		await resetDatabase();
	});

	it('correctly creates new data', async () => {
		await savePractice(testDb, {
			id: 'fooBar',
			correct: 5,
			incorrect: 3,
			skipped: 0
		});
		expect(await testDb.get('skills/fooBar')).toEqual({
			_id: 'skills/fooBar',
			_rev: expect.anything(),
			practiced: [{ at: expect.anything(), correct: 5, incorrect: 3, skipped: 0 }]
		});
	});

	it('correctly creates new data - with skipped', async () => {
		await savePractice(testDb, {
			id: 'fooBar',
			correct: 5,
			incorrect: 3,
			skipped: 1
		});
		expect(await testDb.get('skills/fooBar')).toEqual({
			_id: 'skills/fooBar',
			_rev: expect.anything(),
			practiced: [{ at: expect.anything(), correct: 5, incorrect: 3, skipped: 1 }]
		});
	});

	it('correctly updates data', async () => {
		await savePractice(testDb, {
			id: 'fooBar',
			correct: 5,
			incorrect: 10,
			skipped: 0
		});
		await savePractice(testDb, {
			id: 'fooBar',
			correct: 6,
			incorrect: 3,
			skipped: 0
		});
		expect(await testDb.get('skills/fooBar')).toEqual({
			_id: 'skills/fooBar',
			_rev: expect.anything(),
			practiced: [
				{ at: expect.anything(), correct: 5, incorrect: 10, skipped: 0 },
				{ at: expect.anything(), correct: 6, incorrect: 3, skipped: 0 }
			]
		});
	});
});
