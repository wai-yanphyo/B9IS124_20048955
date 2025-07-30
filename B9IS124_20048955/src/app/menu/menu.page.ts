import { Component, OnInit,OnDestroy } from '@angular/core';
import { DataService, MenuItem } from '../services/data.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone : false
})
export class MenuPage implements OnInit {

  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  searchTerm: string = '';
  cartItemCount: number = 0;

  lastRenderedCategory: string = '';

  private cartSubscription!: Subscription;

  constructor(private dataService: DataService, private socialSharing: SocialSharing,private router: Router) { }


    goToCart() {
    this.router.navigate(['/cart']);
  }

  ngOnInit() {

    this.menuItems = this.dataService.getMenuItems().sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

     this.menuItems.forEach(item => {
    if (item.clickCount === undefined) {
      item.clickCount = 0;
    }
  });

   this.filteredMenuItems = [...this.menuItems];

    this.cartSubscription = this.dataService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
    });

  }

    ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  filterItems(): void {

    if (this.searchTerm.trim() === '') {
      this.filteredMenuItems = [...this.menuItems];
    } else {
      this.filteredMenuItems = this.menuItems.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
      this.lastRenderedCategory = '';
  }

   shouldShowCategory(category: string, index: number): boolean {
    if (index === 0 || this.lastRenderedCategory !== category) {
      this.lastRenderedCategory = category;
      return true;
    }
    return false;
  }

  addToCart(item: MenuItem): void {
    item.clickCount = (item.clickCount || 0) + 1;
    
    this.dataService.addToCart(item);
  }



    async shareItem(item: MenuItem) {
    
    try {
      await this.socialSharing.share(
        `Check out this delicious ${item.name} from My Restaurant! It's ${item.description} for only €${item.price.toFixed(2)}.`,
        undefined,
        undefined,
        item.imageUrl
      );
    } catch (error) {
      console.error('Error sharing item:', error);
      alert('Sharing is not available on this device or this emulator.');
    }




  }
}
