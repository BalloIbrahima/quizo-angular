import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async login(email: string, password: string) {
    // try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    //   this.router.navigate(['/home']);
    //   return true;
    // } catch (error) {
    //   console.error("Erreur: ", error);
    //   return false;
    // }
  }


  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  getUser() {
    return this.afAuth.authState;
  }
}
