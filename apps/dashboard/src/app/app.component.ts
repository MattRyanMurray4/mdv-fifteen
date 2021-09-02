import { Component } from '@angular/core';

@Component({
  selector: 'tv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TV-Application';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'shows', icon: 'view_list', title: 'TV-Shows' },
  ];
}
