import { Component } from '@angular/core';
import { PoFieldModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  imports: [PoFieldModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {

  public titulo: string = 'Titulo';
  login: string ;

  constructor() {
    this.login = '';
  }

  public fnClick() {

  }
}
