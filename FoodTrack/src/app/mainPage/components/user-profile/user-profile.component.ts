import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  array = ['User Data', 'Profile Picture', 'Delete User'];
  effect = 'scrollx';

  constructor() { }

  ngOnInit() {
  }

}
