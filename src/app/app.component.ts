import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './components/models/cart.model';

@Component({
  selector: 'app-root',
  template: ` 
  <app-header [cart]="cart"></app-header>
  <router-outlet></router-outlet>
    `,
  styles: []
})
export class AppComponent implements OnInit {
  
  cart: Cart = {items:[]};
  constructor(private cartService: CartService){  }
  
  ngOnInit(){
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
