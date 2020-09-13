import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/clases/user';
// import { }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;

  constructor(public angularFireAuth: AngularFireAuth) {
    angularFireAuth.authState.subscribe(user => (this.isLogged = user));

  }



  //login
  async onLogin(user: User) {
    try {
      console.log("LOGIN" + user.email);

      return await this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.info("ERROR al logear: ", error)
      return error.code.toString();
    }
  }

  async usuarioLogeado() {
    try {
      return await this.angularFireAuth.auth.currentUser;
    } catch (error) {
      console.info("ERROR, al obtener el usuario logeado: ", error)
    }
  }
  //register
  async onRegister(user: User) {
    try {
      console.log("REGISTRO" + user.email);
      return await this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error) {
      console.info("ERROR al registrar: ", error)
      return error.code.toString();
    }
  }

}
