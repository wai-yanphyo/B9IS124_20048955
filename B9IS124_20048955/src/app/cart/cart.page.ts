import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService, CartItem, MenuItem } from '../services/data.service';
import { Haptics  } from '@capacitor/haptics';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false 
})
export class CartPage implements OnInit,OnDestroy {

  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';

  private cartSubscription!: Subscription;

  constructor(private dataService: DataService) { }

  ngOnInit() {
     this.cartSubscription = this.dataService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.cartTotal = this.dataService.getCartTotal();
    });
  }

    ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  
  addToCart(item: CartItem): void {
    this.dataService.addToCart(item as MenuItem);
  }

removeFromCart(itemId: number): void {
    this.dataService.removeFromCart(itemId);
  }


 

   showModal(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.isModalOpen = true;
  }

}
