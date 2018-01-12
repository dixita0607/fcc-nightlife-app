import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Restaurant} from "../models/restaurant";

@Injectable()
export class RestaurantService {

  private baseUrl: string = '/api';

  constructor(private httpClient: HttpClient) {
  }

  getRestaurants(city: string): Observable<RestaurantServiceResponse> {
    return this.httpClient.get<RestaurantServiceResponse>(`${this.baseUrl}/search?city=${city}`);
  }

  visit(restaurantId: number, visiting: boolean): Observable<string> {
    return this.httpClient
      .post(`${this.baseUrl}/visit`, {restaurantId, visiting}, {responseType: 'text'});
  }

}

export interface RestaurantServiceResponse {
  restaurants: Restaurant[];
  city: string;
}

