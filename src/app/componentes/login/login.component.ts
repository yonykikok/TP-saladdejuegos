import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { User } from 'src/app/clases/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  user: User = new User();
  mostrarErrorInvalidMail: boolean = false;
  mostrarErrorInvalidUser: boolean = false;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {

    this.formLogin = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  ngOnInit() {
  }

  async onLogin() {
    const user = await this.authService.onLogin(this.user);
    if (user.user) {//si devuelve un usuario valido, entra!
      this.mostrarErrorInvalidUser = false;
      this.mostrarErrorInvalidMail = false;
      console.info("LOGIN exitoso");
      this.router.navigateByUrl('/Principal');
    }
    else {
      switch (user) {
        case "auth/invalid-email":
          this.mostrarErrorInvalidMail = true;
          this.mostrarErrorInvalidUser = false;
          break;
        case "auth/user-not-found":
          this.mostrarErrorInvalidUser = true;
          this.mostrarErrorInvalidMail = false;
          break;
        case "auth/wrong-password":
          this.mostrarErrorInvalidUser = true;
          this.mostrarErrorInvalidMail = false;
          break;
      }
    }
  }

}
