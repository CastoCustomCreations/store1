import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import {Cart, CartItem}from 'src/app/components/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{
  cart: Cart = {items: [{ 
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1,
  },
  { 
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 2,
    id: 2,
  }
]};


  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  constructor(private cartService: CartService, private http: HttpClient){}

  ngOnInit():void{
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }
  getTotal(items: Array<CartItem>): number{
     return items.
    map((item) => item.price *item.quantity)
    .reduce((prev, current) => prev + current, 0);
  }

  onClearCart():void{
    this.cartService.clearCart();
  }
  OnRemoveFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item);
  }
  OnAddQuantity(item: CartItem):void{
    this.cartService.addToCart(item);
  }
  OnRemoveQuantity(item: CartItem):void{
    this.cartService.removeQuantity(item);
  }

  OnCheckout():void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any) => {
      let stripe = await loadStripe('pk_test_51MvgyeKaQiBub9xt5ah4P9eovNND2Gd0tkSnooIpIxYqDDHCBqIvZHlXy6FWA5sVtSTbHoAxz2axlRPLkrJeUVbo00VJMkiNRw');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }
}
