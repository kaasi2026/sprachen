import dayjs from 'dayjs';

/** @param {number} n @returns {number} */
const fib = (n) => (n > 1 ? fib(n - 1) + fib(n - 2) : 1);

/** @param {{practicesSoFar: number}} params */
export const daysUntilNextPractice = ({ practicesSoFar }) => fib(practicesSoFar);

/** @param {import('../types').Practice[]} practices */
export const getLastPractice = (practices) =>
	[...practices].sort((a, b) => (dayjs(a.at).isAfter(dayjs(b.at)) ? -1 : 1))[0].at;

/** @param {{lastPractice: import('dayjs').ConfigType; practicesSoFar: number}} params */
export const wouldBeStale = ({ lastPractice, practicesSoFar }) => {
	const shouldBeStaleAt = dayjs(lastPractice).add(daysUntilNextPractice({ practicesSoFar }), 'day');

	return dayjs().isAfter(dayjs(dayjs(shouldBeStaleAt).subtract(1, 'second')));
};

/** @param {{practices: import('../types').Practice[]}} params */
export const isStale = ({ practices }) => {
	if (practices.length === 0) return false;
	return wouldBeStale({
		practicesSoFar: practices.length,
		lastPractice: getLastPractice(practices)
	});
};
