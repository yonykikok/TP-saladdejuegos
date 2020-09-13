import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { User } from 'src/app/clases/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user: User = new User();
  aceptoTerminos: boolean = false;
  mostrarErrorInvalidMail: boolean = false;
  mostrarErrorUsuarioExistente: boolean = false;
  formLogin: FormGroup;
  ngOnInit() {
  }
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.formLogin = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }



  aceptarTerminos() {
    this.aceptoTerminos = true;
  }

  async onRegister() {
    const user = await this.authService.onRegister(this.user);
    if (user.user) {
      this.mostrarErrorUsuarioExistente = false;
      this.mostrarErrorInvalidMail = false;
      console.info("Resgistro Exitoso");
      this.router.navigateByUrl('/Principal')
    }
    else {
      switch (user) {
        case "auth/invalid-email":
          this.mostrarErrorInvalidMail = true;
          this.mostrarErrorUsuarioExistente = false;
          break;
        case "auth/email-already-in-use":
          this.mostrarErrorUsuarioExistente = true;
          this.mostrarErrorInvalidMail = false;
          break;
      }
    }
  }
}
