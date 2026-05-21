import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from './core/environments/environment';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {

  constructor() {
    //alert(`Ambiente ${environment.ambiente}`);
    console.log(`Ambiente ${environment.ambiente}`);
  }

}
