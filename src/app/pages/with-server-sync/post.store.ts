import {signalStore, withMethods, withState} from '@ngrx/signals';
import {withServerSync} from '../../libs/extentions/with-server-sync';

export type TPost = {userId:number,id:number,title:string,body:string}

export type TPostState ={
  posts:TPost[]
}

export const PostStore = signalStore(

  withState<TPostState>({posts:[]}),

  withServerSync({endpoint:'https://jsonplaceholder.typicode.com/posts',method:'GET'}),

  withMethods(() => {
    return {}
  }),
)
