import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'with-storage-sync',
		loadComponent: () =>
			import('./pages/with-storage-sync/with-storage-sync.component').then(
				(M) => M.WithStorageSyncComponent,
			),
	},
	{
		path: 'with-server-sync',
		loadComponent: () =>
			import('./pages/with-server-sync/with-server-sync.component').then(
				(M) => M.WithServerSyncComponent,
			),
	},
	{
		path: '**',
		redirectTo: 'with-server-sync',
	},
];
