import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoInfoModule } from '@po-ui/ng-components';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, PoFieldModule, PoButtonModule, PoInfoModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]]
  });


  constructor() {
  }

  public submit = () => {

    const username: string = this.form.value.username ?? '';
    const password: string = this.form.value.password ?? '';

    console.log(`username: ${username} - password: ${password}`);

    this.authService.createSection(username, password).subscribe()

  }

}
