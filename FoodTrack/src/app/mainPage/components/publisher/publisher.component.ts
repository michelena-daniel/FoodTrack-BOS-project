import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-publisher',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.less']
})
export class PublisherComponent implements OnInit {
  @Input() user;

  @Output() publish = new EventEmitter<object>();

  mealTime = '';

  foodName = '';

  description = '';

  calories = '';

  constructor() { }

  ngOnInit() {
  }
  
  

  publishStatus() {
    if (!this.foodName) {
      return;
    }
    const foodPost = { foodName: this.foodName, description: this.description, calories: this.calories, mealTime: this.mealTime};
    this.publish.emit(foodPost);
    window.location.reload()
    // if (!this.description){
    //   return;
    // }
    // this.publish.emit(this.description);
    // if (!this.calories){
    //   return;
    // }
    // this.publish.emit(this.calories);
  }

  exploreKeyPressed($event) {
    if ($event.which === 13 && $event.metaKey) {
      this.publish.emit({foodName: this.foodName, description: this.description, calories: this.calories});
  }


}

}