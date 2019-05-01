import { Post } from '../../mainPage.models';
import { Error } from 'src/app/error/error.models';
import { PostRequest } from '../../mainPage.models';

export class GetPosts {
  static readonly type = '[Dashboard] GetPosts';
  constructor(public userId?: string) {}
}

export class GetPostsSuccess {
  static readonly type = '[Dashboard] GetPostsSuccess';
  constructor(public posts: Post[]) {}
}

export class GetPostsFailed {
  static readonly type = '[Dashboard] GetPostsFailed';
  constructor(public errors: Error[], private uuid: string) {}
}

export class AddPost {
  static readonly type = '[Posts] AddPost';
  constructor(public postRequest: PostRequest) {}
}

export class AddPostSuccess {
  static readonly type = '[Posts] AddPostSuccess';
  constructor(public post: Post) {}
}

export class AddPostFailed {
  static readonly type = '[Posts] AddPostFailed';
  constructor(public errors: Error[]) {}
}