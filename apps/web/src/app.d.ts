/// <reference types="jest" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		_DB?: PouchDB.Database;
		_fakeLogin?: () => void;
		_Login?: (username: string, password: string) => Promise<void>;
		_Logout?: () => Promise<void>;
		_test_credentials_correct?: boolean;
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
