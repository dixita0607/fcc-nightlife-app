import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RestaurantService} from "../../services/restaurant.service";
import {Router} from "@angular/router";
import {Restaurant} from "../../models/restaurant";

@Component({
  selector: 'fcc-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  @Input()
  restaurant: Restaurant;

  @Output()
  visited: EventEmitter<null> = new EventEmitter<null>();

  visiting: boolean = false;

  constructor(public authService: AuthService, private restaurantService: RestaurantService, private router: Router) {
  }

  ngOnInit() {
  }

  visit() {
    if (this.authService.user) {
      this.restaurantService.visit(this.restaurant.id, !this.restaurant.stats.visiting).subscribe(
        response => this.visited.emit(),
        error => console.log(error)
      )
    } else {
      window.location.href = '/api/auth/twitter';
    }
  }

}
