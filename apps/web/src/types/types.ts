export type SizeType = '1' | '1/3' | '1/2' | '1/4' | '3/5' | '3' | '2/5';

export type ChoiceChallenge = {
	type: string;
	formInTargetLanguage: string;
};

export type PrepareChallengeArguments<T extends ChoiceChallenge> = {
	currentChallenge: T;
	alternativeChallenges: T[];
	typeToSelect: string;
	hasFakeOption?: boolean | null;
};

export type PreparedChoice<T extends ChoiceChallenge> = T & {
	correct: boolean;
	fake?: boolean;
};
