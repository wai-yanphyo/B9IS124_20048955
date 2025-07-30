import { Injectable } from '@angular/core';


export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  clickCount?: number;
}


@Injectable({
  providedIn: 'root'
})




export class DataService {

    private menuItems: MenuItem[] = [
    { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 12.50, imageUrl: 'https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/9449/31939/P111023181554_1__26792.1722540163.jpg?c=2', category: 'Pizzas' },
    { id: 2, name: 'Spaghetti Carbonara', description: 'Pasta with egg, hard cheese, cured pork, and black pepper.', price: 14.00, imageUrl: 'https://placehold.co/400x300/33FF57/FFFFFF?text=Carbonara', category: 'Pastas' },
    { id: 3, name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan cheese, and Caesar dressing.', price: 9.75, imageUrl: 'https://placehold.co/400x300/3357FF/FFFFFF?text=Salad', category: 'Salads' },
    { id: 4, name: 'Cheeseburger', description: 'Beef patty, cheese, lettuce, tomato, onion, pickles.', price: 11.00, imageUrl: 'https://placehold.co/400x300/FFFF33/000000?text=Burger', category: 'Burgers' },
    { id: 5, name: 'Chocolate Lava Cake', description: 'Warm chocolate cake with a molten chocolate center.', price: 7.00, imageUrl: 'https://placehold.co/400x300/FF33FF/FFFFFF?text=Dessert', category: 'Desserts' },
    { id: 6, name: 'Coca-Cola', description: 'Refreshing soft drink.', price: 2.50, imageUrl: 'https://placehold.co/400x300/33FFFF/000000?text=Coke', category: 'Drinks' }
  ];



  constructor() { }

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }
  
}
