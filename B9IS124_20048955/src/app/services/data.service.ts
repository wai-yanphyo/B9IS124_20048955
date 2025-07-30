import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  clickCount?: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})




export class DataService {

    private menuItems: MenuItem[] = [
    { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 12.50, imageUrl: 'https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/9449/31939/P111023181554_1__26792.1722540163.jpg?c=2', category: 'Pizzas' },
    { id: 2, name: 'Spaghetti Carbonara', description: 'Pasta with egg, hard cheese, cured pork, and black pepper.', price: 14.00, imageUrl: 'https://www.allrecipes.com/thmb/zJzTLhtUWknHXVoFIzysljJ9wR8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg', category: 'Pastas' },
    { id: 3, name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing.', price: 9.75, imageUrl: 'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg', category: 'Salads' },
    { id: 4, name: 'Cheeseburger', description: 'Beef patty, cheese, lettuce, tomato, onion, pickles.', price: 11.00, imageUrl: 'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2240,c_limit/Smashburger-recipe-120219.jpg', category: 'Burgers' },
    { id: 5, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten chocolate center.', price: 7.00, imageUrl: 'https://sallysbakingaddiction.com/wp-content/uploads/2017/02/lava-cake.jpg', category: 'Desserts' },
    { id: 6, name: 'Coca-Cola', description: 'Refreshing soft drink.', price: 2.50, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Glass_of_Cola.jpg/800px-Glass_of_Cola.jpg', category: 'Drinks' }
  ];



private cart = new BehaviorSubject<CartItem[]>([]);
  
cart$: Observable<CartItem[]> = this.cart.asObservable();


  constructor() {

     const storedCart = localStorage.getItem('restaurantCart');
    if (storedCart) {
      this.cart.next(JSON.parse(storedCart));
    }
   }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

      addToCart(item: MenuItem): void {
        const currentCart = this.cart.getValue();
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);

        if (existingItem) {
          existingItem.quantity++;
     } else {
          currentCart.push({ ...item, quantity: 1 });
        }
      this.cart.next(currentCart);
      this.saveCart();
  }

   removeFromCart(itemId: number): void {
    let currentCart = this.cart.getValue();
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === itemId);

    if (existingItemIndex > -1) {
      const existingItem = currentCart[existingItemIndex];
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
      } else {
        
        currentCart = currentCart.filter(cartItem => cartItem.id !== itemId);
      }
    }
    this.cart.next(currentCart);
  }

   clearCart(): void {
    this.cart.next([]);
    this.saveCart();
  }

  getCartTotal(): number {
   return this.cart.getValue().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

   private saveCart(): void {
    localStorage.setItem('restaurantCart', JSON.stringify(this.cart.getValue()));
  }





  
}
