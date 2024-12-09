import { signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { withServerSync } from '../../libs/extentions/with-server-sync';
import { HttpClient } from '@angular/common/http';
import { effect, inject } from '@angular/core';
import { of, switchMap } from 'rxjs';

export type TPost = { userId: number; id: number; title: string; body: string };

export type TPostState = {
	posts: TPost[];
};

export const PostStore = signalStore(
	withState<TPostState>({ posts: [] }),
	withServerSync({
		queryFn: () =>
			inject(HttpClient)
				.get('https://jsonplaceholder.typicode.com/posts')
				.pipe(switchMap((res) => of(res))),
	}),
	withMethods((store) => {
		const setPosts = () => {
			console.log(store.data());
		};
		return {
			setPosts,
		};
	}),

	withHooks({
		onInit(store) {
			effect(() =>
				((loading): void => {
					if (!loading) {
						store.setPosts();
					}
				})(store.loading()),
			);
		},
	}),
);
