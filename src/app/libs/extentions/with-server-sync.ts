import { HttpClient } from '@angular/common/http';
import { effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
	getState,
	patchState,
	signalStoreFeature,
	withHooks,
	withMethods,
	withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export type TWithServerSyncOptions = {
	autoSyncOnChange: boolean;
};

export type TWithServerSyncState = {
	data: object;
	loading: boolean;
};

export function withServerSync({
	endpoint,
	method,
	options,
}: { endpoint: string; method: string; options?: TWithServerSyncOptions }) {
	return signalStoreFeature(
		withState<TWithServerSyncState>({ data: {}, loading: false }),

		withMethods((store, [http] = [inject(HttpClient)]) => {
			const initializeFromServer = rxMethod(
				pipe(
					tap(() => patchState(store, { loading: true })),
					switchMap(() => {
						return http.request(method, endpoint).pipe(
							tapResponse({
								next: (data) => {
									patchState(store, { data, loading: false });
								},
								error: () => {
									// todo
								},
							}),
						);
					}),
				),
			);

			return {
				initializeFromServer,
			};
		}),

		withHooks({
			onInit(store): void {
				store.initializeFromServer({});

				if (options?.autoSyncOnChange) {
					effect(() => {
						// todo
					});
				}
			},
		}),
	);
}
