import { effect } from '@angular/core';
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
import { Observable, pipe, switchMap, tap } from 'rxjs';

export type TWithServerSyncOptions = {
	autoSyncOnChange: boolean;
};

export type TWithServerSyncState = {
	error:unknown,
	data: unknown;
	loading: boolean;
};

export function withServerSync({
	queryFn,
	options,
}: { queryFn:() => Observable<unknown> ,options?: TWithServerSyncOptions }) {
	return signalStoreFeature(
		withState<TWithServerSyncState>({ data: undefined,error:undefined, loading: false }),

		withMethods((store) => {

			const query = rxMethod<{}>(
				pipe(
					tap(() => patchState(store,{loading:true})),
					switchMap(() => {
						return queryFn().pipe(
							tapResponse({
								next:(data) => {
									patchState(store,{data})
								},
								error:(error) => {
									patchState(store,{error})
								},
								finalize:() => {
									patchState(store,{loading:false})
								}
							})
						)
					})
				)
			)

			const mutation = rxMethod(
				pipe()
			)

			return {
				query,
				mutation,
			};
		}),

		withHooks({
			onInit(store): void {
				store.query({})

				if (options?.autoSyncOnChange) {
					effect(() => {
						// todo
					});
				}
			},
		}),
	);
}
