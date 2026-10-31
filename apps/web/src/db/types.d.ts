import type { ConfigType } from 'dayjs';

export type Practice = {
	at: ConfigType;
	correct?: number;
	incorrect?: number;
	skipped?: number;
};

export type SkillDocument = {
	_id?: string;
	_rev?: string;
	practiced: Practice[];
};
