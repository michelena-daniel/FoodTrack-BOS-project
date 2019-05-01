import { Component, OnInit } from '@angular/core';
import { Logout } from 'src/app/auth/store/auth.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent {

  constructor( private store: Store ) { }

  logoutUser() {
    this.store.dispatch(new Logout());
  }

}
