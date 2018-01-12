import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RestaurantService, RestaurantServiceResponse} from "../../services/restaurant.service";
import {Restaurant} from "../../models/restaurant";

@Component({
  selector: 'fcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  restaurants: Restaurant[];
  hasSessionStorage: boolean;

  constructor(private fb: FormBuilder, private restaurantService: RestaurantService) {
    this.hasSessionStorage = !!window.sessionStorage;
  }

  ngOnInit() {
    const city = this.hasSessionStorage && sessionStorage.getItem('city') || '';
    this.createForm(city);
    if (city) this.findRestaurants(city);
  }

  createForm(city: string) {
    this.form = this.fb.group({city});
  }

  findRestaurants(city: string) {
    this.restaurantService.getRestaurants(city).subscribe(
      (response: RestaurantServiceResponse) => {
        this.restaurants = response.restaurants;
        this.form.controls['city'].setValue(response.city);
        if (this.hasSessionStorage) sessionStorage.setItem('city', response.city);
      },
      error => console.log(error)
    )
  }

  onVisited() {
    this.findRestaurants(this.form.controls['city'].value);
  }
}
