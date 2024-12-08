import { Component, inject, signal, type WritableSignal } from '@angular/core';
import { AuthStore } from './auth.store';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-with-storage-sync',
	providers: [AuthStore],
	imports: [FormsModule],
	template: `
    <h1>With Storage Sync</h1>
    <div>
      <h3>Username:{{ authStore.username() }}</h3>

      <h3>idToken:{{ authStore.idToken() }}</h3>

      <h3>Update Username</h3>
      <input [(ngModel)]="updateUsername">
      <button (click)="onClickUpdateUsername()">update</button>
    </div>
  `,
})
export class WithStorageSyncComponent {
	readonly authStore = inject(AuthStore);

	updateUsername: WritableSignal<string> = signal<string>('');

	onClickUpdateUsername = () => {
		this.authStore.setUsername({ username: this.updateUsername() });
	};
}
