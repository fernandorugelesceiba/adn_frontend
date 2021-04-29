import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ADN fernando';
  public companies: MenuItem[] = [
    { url: '/cliente', nombre: 'cliente' },
    { url: '/cuenta', nombre: 'cuenta' },
    { url: '/transacciones', nombre: 'transaccion' }
  ];
}
