import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]

})
export class LoginComponent {
  loginForm: FormGroup;
  pseudo=""
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).then(() => {
      this.messageService.add({ severity:'success', summary: 'Succès', detail: 'Vous êtes connecté' });
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.log(err);
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Login ou Mot de passe incorrect' });
    });

  }

  goToQuiz() {
    localStorage.setItem('pseudo', this.pseudo);
    this.router.navigate(['/play']);
  }
}