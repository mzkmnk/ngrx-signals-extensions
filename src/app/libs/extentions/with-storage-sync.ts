import {
	getState,
	patchState,
	signalStoreFeature,
	withHooks,
	withMethods,
} from '@ngrx/signals';
import { effect } from '@angular/core';

export type TWithStorageSyncOptions = {
	autoSync: boolean;
};

export function withStorageSync({
	storage,
	key,
	options,
}: { storage: Storage; key: string; options?: TWithStorageSyncOptions }) {
	return signalStoreFeature(
		withMethods((store) => {
			/**
			 * read from storage
			 */
			const readFromStorage = (): void => {
				const item: string | null = storage.getItem(key);
				if (item === null) {
					return;
				}
				patchState(store, JSON.parse(item));
			};

			/**
			 * write to storage
			 */
			const writeToStorage = (): void => {
				const state = getState(store);

				storage.setItem(key, JSON.stringify(state));
			};

			/**
			 * remove item in storage
			 */
			const removeItemInStorage = (): void => {
				storage.removeItem(key);
			};

			return {
				readFromStorage,
				writeToStorage,
				removeItemInStorage,
			};
		}),

		withHooks({
			onInit(store): void {
				if (options?.autoSync) {
					store.writeToStorage();

					// writeToStorageのgetStateが取得するstateを変更検知のトリガーとする
					effect(() =>
						((_store) => {
							store.writeToStorage();
						})(getState(store)),
					);
				}
			},
		}),
	);
}
