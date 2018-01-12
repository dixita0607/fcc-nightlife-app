import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'fcc-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  @Input()
  restaurants;

  @Output()
  visited: EventEmitter<null> = new EventEmitter<null>();

  constructor() {
  }

  ngOnInit() {
  }

  onVisited() {
    this.visited.emit();
  }

}
