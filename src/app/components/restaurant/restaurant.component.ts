import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RestaurantService} from "../../services/restaurant.service";
import {Restaurant} from "../../models/restaurant";
import {ToastService} from "../../services/toast.service";

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
  restaurantImage: string = "../../../assets/images/knife-fork.jpeg";

  constructor(public authService: AuthService,
              private restaurantService: RestaurantService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  visit() {
    if (this.authService.user) {
      this.restaurantService.visit(this.restaurant.id, !this.restaurant.stats.visiting).subscribe(
        response => {
          this.toastService.showToast(!this.restaurant.stats.visiting ? 'Visiting.' : 'Visit cancelled.');
          this.visited.emit();
        },
        error => this.toastService.showToast('Could not visit.', true)
      )
    } else {
      window.location.href = '/api/auth/twitter';
    }
  }

}
