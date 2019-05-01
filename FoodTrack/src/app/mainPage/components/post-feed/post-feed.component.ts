import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-post-feed',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.less']
})
export class PostFeedComponent implements OnInit {
  //@Input() post;
  //@Input() user;
  
  //foodName: string;

  data: any = {};

  constructor(private http: HttpClient) { 
    this.getItems();
    this.getPosts();
  }
  
  //headers

  getItems() {
    return this.http.get(`${environment.apiBaseUrl}/getPosts`);
  }

  getPosts () {
    this.getItems().subscribe(data => {
      console.log(data);
      this.data = data
    })
  }

  ngOnInit() {
  }

}
