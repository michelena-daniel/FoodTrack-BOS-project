import { State, Store, Action, StateContext } from '@ngxs/store';
import { PostService } from '../services/post.service';
import {
  GetPosts,
  GetPostsSuccess,
  GetPostsFailed,
  AddPostFailed,
  AddPost,
  AddPostSuccess,
} from './post.action';
import { tap, catchError } from 'rxjs/operators';
import { Post } from '../../mainPage.models';
import { SetErrors } from 'src/app/error/store/error.actions';
import { Logout } from 'src/app/auth/store/auth.actions';
import { Navigate } from '@ngxs/router-plugin';

@State<Post[]>({
  name: 'posts',
  //defaults: []
})
export class PostState {
  constructor(private postService: PostService, private store: Store) {}

  @Action(GetPosts)
  getPosts({ dispatch }: StateContext<Post[]>, { userId }: GetPosts) {
    return this.postService.getWall(userId).pipe(
      tap(posts => dispatch(new GetPostsSuccess(posts))),
      catchError(error => dispatch(new GetPostsFailed(error.error, userId)))
    );
  }

  @Action(GetPostsSuccess)
  getPostsSuccess(
    { setState }: StateContext<Post[]>,
    { posts }: GetPostsSuccess
  ) {
    setState(
      posts.sort((p1, p2) => {
        return p2.eatenAt - p1.eatenAt;
      })
    );
  }

  @Action(AddPost)
  addPost({ dispatch }: StateContext<Post[]>, { postRequest }: AddPost) {
    const currentUser = this.store.selectSnapshot(state => state.auth);

    return this.postService.addPost(postRequest.foodName, postRequest.description, postRequest.calories).pipe( 
      tap(post =>
        dispatch(
          new AddPostSuccess({
            ...post,
            //author: currentUser,
            author: currentUser
            //owner: currentUser
          })
        )
      ),
      catchError(error => dispatch(new AddPostFailed(error.error)))
    );
  }

  @Action(AddPostSuccess)
  addPostSuccess(
    { setState, getState }: StateContext<Post[]>,
    { post }: AddPostSuccess
  ) {
    setState([post, ...getState()]);
  }

  @Action([GetPostsFailed])
  getPostsFailed({ dispatch }: StateContext<Post[]>, { errors, uuid }: any) {
    if (errors && errors.filter(error => error.status === 403).length > 0) {
      dispatch(new Navigate(['wall']));
    } else {
      dispatch(new SetErrors(errors));
    }
  }

  @Action(Logout)
  logout({ setState }: StateContext<Post[]>) {
    setState(null);
  }

  @Action([AddPostFailed])
  error({ dispatch }: StateContext<Post[]>, { errors }: any) {
    dispatch(new SetErrors(errors));
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line
      let r = (Math.random() * 16) | 0, // tslint:disable-line
        v = c == 'x' ? r : (r & 0x3) | 0x8; // tslint:disable-line
      return v.toString(16);
    });
  }
}
