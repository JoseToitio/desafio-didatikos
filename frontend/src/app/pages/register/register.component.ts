import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, IRegister } from '../../services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, AuthFormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(formData: IRegister) {
    this.authService.register(formData).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.errorMessage = err.error.error || 'Falha ao realizar cadastro. Verifique os dados.';
      }
    });
  }
}
