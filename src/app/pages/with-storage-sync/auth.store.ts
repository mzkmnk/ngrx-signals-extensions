import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withStorageSync } from '../../libs/extentions/with-storage-sync';

export type TAuthState = {
	username: string;
	idToken: string;
};

export const AuthStore = signalStore(
	// state
	withState<TAuthState>({
		username: 'mzkmnk',
		idToken: '<PASSWORD>',
	}),

	withStorageSync({
		storage: localStorage,
		key: 'auth',
		options: { autoSync: true },
	}),

	withMethods((store) => {
		const setUsername = ({ username }: { username: string }): void => {
			patchState(store, (state) => ({ ...state, username }));
		};

		return {
			setUsername,
		};
	}),
);
