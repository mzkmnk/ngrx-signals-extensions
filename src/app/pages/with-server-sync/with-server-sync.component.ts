import {Component, computed, effect, inject} from '@angular/core';
import {PostStore} from './post.store';

@Component({
  selector:'app-with-server-sync',
  providers:[PostStore],
  template:`
    <div>
      <h1>WithServerSync</h1>
    </div>
  `
})
export class WithServerSyncComponent {

  private readonly postStore = inject(PostStore);

  readonly posts = this.postStore.posts;
}
