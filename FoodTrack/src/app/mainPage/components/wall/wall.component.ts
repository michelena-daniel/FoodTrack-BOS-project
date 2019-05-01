import { Component, OnInit, ElementRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetPosts, AddPost } from '../store/post.action';
import { PostState } from '../store/post.state';
import { Post } from '../../mainPage.models';
import { Observable, interval } from 'rxjs';
import { AuthState } from 'src/app/auth/store/auth.state';
import { Auth } from '../../../auth/auth.models';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.less']
})
export class WallComponent implements OnInit {

  //@Select(PostState) posts$: Observable<Post[]>;
  @Select(AuthState) currentUser$: Observable<Auth>;
  

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private element: ElementRef
  ) {}

  ngOnInit() {

      this.element.nativeElement.parentElement.scrollTop = 0;    
  }

  publishPost(foodPost) {
    this.store.dispatch(new AddPost(foodPost));
  }

}
