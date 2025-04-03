import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ILogin } from '../../services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, AuthFormComponent],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  cpf = ''
  password = ''
  errorMessage = ''

  constructor(private authService: AuthService, private router: Router) {}
  onLogin(formData: ILogin) {
    this.authService.login(formData).subscribe({
      next: (token: string) => {
        localStorage.setItem('token', token);
        // this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage =  err.error.error || 'Falha ao realizar login. Verifique suas credenciais.';
      }
    });
  }
}
