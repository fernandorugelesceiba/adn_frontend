import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.css']
})
export class BorrarProductoComponent implements OnInit {
  productoForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
