import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor() {}

     async openExternalLink() {
    try {
      await Browser.open({ url: '[https://theoldstorehouse.ie/](https://theoldstorehouse.ie/)' });
    } catch (error) {
      console.error('Error opening in-app browser:', error);
      window.open('[https://theoldstorehouse.ie/](https://theoldstorehouse.ie/)', '_system');
    }
  }
}
