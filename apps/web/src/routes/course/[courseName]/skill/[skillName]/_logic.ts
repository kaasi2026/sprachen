// TODO: move to lib and rewrite

// TODO: remove this
function shuffle<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

type GroupedChallenge = {
	id: string;
	group: string;
	priority: number;
};

type PositionedChallenge<T> = {
	item: T;
	index: number;
};

export const removeAlternatives = <T extends { id: string }>(challenges: T[]): T[] => {
	const uniqueChallenges = Object.fromEntries(
		challenges.map((challenge): [string, T] => [challenge.id, challenge])
	);
	return Object.values(uniqueChallenges);
};

export const sortChallengeGroups = <T extends GroupedChallenge>(
	challenges: T[],
	expectedNumberOfChallenges: number
): T[] => {
	// This is a very inefficient sorting algorithm to make sure that random order is preserved
	// as much as possible while also priorities are respected within groups
	// this is useful because some challenges should precede others

	const allGroups = [...new Set(challenges.map(({ group }) => group))];
	const challengesPerGroup = Math.round(challenges.length / allGroups.length);
	const expectedNumberOfGroups = Math.max(
		1,
		Math.round(expectedNumberOfChallenges / challengesPerGroup)
	);
	const acceptedGroups = shuffle(allGroups).slice(0, expectedNumberOfGroups);

	const allowedChallenges = challenges.filter(({ group }) => acceptedGroups.includes(group));
	const challengesWithPosition = removeAlternatives(allowedChallenges).map((item, index) => ({
		item,
		index
	}));

	const isSmallestInGroup = (itemToCheck: T) =>
		challengesWithPosition.filter(
			({ item }) => item.group === itemToCheck.group && item.priority < itemToCheck.priority
		).length === 0;

	const sortedResults: T[] = [];
	while (challengesWithPosition.length > 0) {
		const firstItem = challengesWithPosition[0];
		if (!firstItem) break;

		let bestItem: PositionedChallenge<T> = firstItem;
		let bestItemIndex = 0;

		// Make sure that we prioritize and element that is the first in its group
		challengesWithPosition.forEach(({ index, item }, position) => {
			if (isSmallestInGroup(item)) {
				bestItem = { index, item };
				bestItemIndex = position;
			}
		});

		// Make sure that we prioritize based on the random sort
		challengesWithPosition.forEach(({ index, item }, position) => {
			if (bestItem.index > index) {
				if (!isSmallestInGroup(item)) return;
				bestItem = { index, item };
				bestItemIndex = position;
			}
		});

		sortedResults.push(bestItem.item);
		challengesWithPosition.splice(bestItemIndex, 1);
	}

	return sortedResults;
};
