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

  constructor() { }
}
