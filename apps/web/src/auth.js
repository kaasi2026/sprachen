// TODO: Move to lib

import { writable } from 'svelte/store';

/**
 * @typedef {{
 *   user: { name: string } | null,
 *   online: boolean | null,
 *   dbUpdatedAt: number | null
 * }} AuthState
 */

/** @type {import('svelte/store').Writable<AuthState>} */
const authStore = writable({
	user: null,
	online: null,
	dbUpdatedAt: null
});

export default authStore;
