import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RestaurantService} from "./services/restaurant.service";
import {HttpClientModule} from "@angular/common/http";
import {RestaurantListComponent} from './components/restaurant-list/restaurant-list.component';
import {RestaurantComponent} from './components/restaurant/restaurant.component';
import {AuthService} from "./services/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantListComponent,
    RestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
