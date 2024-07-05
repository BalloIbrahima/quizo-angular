import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../service/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.authService.getUser().pipe(map(user => {
      if (user) {
        this.router.navigate(['/home']);
        return false;
      } else {
        return true;
      }
    }));
  }
}
