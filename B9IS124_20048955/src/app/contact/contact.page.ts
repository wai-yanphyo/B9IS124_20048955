import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: false
})
export class ContactPage implements OnInit {

    latitude: number | undefined;
  longitude: number | undefined;
  locationError: string | undefined;

  restaurantLatitude: number = 53.3498;
  restaurantLongitude: number = -6.2603;

  constructor() { }

  ngOnInit() {
  }





 async getCurrentLocation(): Promise<void> {
    this.locationError = undefined;
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus.location !== 'granted') {
        const requestStatus = await Geolocation.requestPermissions();
        if (requestStatus.location !== 'granted') {
          this.locationError = 'SIr,Location permission denied.';
          return;
        }
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });

      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      console.log('Current location:', this.latitude, this.longitude);

    } catch (error: any) {
      console.error('Error getting location:', error);
      if (error.message.includes('User denied geolocation prompt')) {
        this.locationError = 'Location access denied by user.';
      } else if (error.message.includes('Location services are not enabled')) {
        this.locationError = 'Location services are not enabled on your device.';
      } else {
        this.locationError = 'Could not retrieve location. Please try again.';
      }
    }
  }

  openGoogleMaps(): void {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${this.restaurantLatitude},${this.restaurantLongitude}`;
    window.open(mapsUrl, '_system');
  }



}
