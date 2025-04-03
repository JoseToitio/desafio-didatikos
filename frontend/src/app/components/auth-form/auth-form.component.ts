import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ILogin, IRegister } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
  @Input() title!: string;
  @Input() isRegister: boolean = false;
  @Output() loginSubmit = new EventEmitter<ILogin>();
  @Output() registerSubmit = new EventEmitter<IRegister>();
  @Input() errorMessage: string = '';
  formData: IRegister = {
    name: '',
    cpf: '',
    password: '',
    role: 'USER'
  };

  submitForm() {
    if (this.isRegister) {
      const registerData: IRegister = {
        name: this.formData.name,
        cpf: this.formData.cpf,
        password: this.formData.password,
        role: this.formData.role,
      };
      this.registerSubmit.emit(registerData);
    } else {
      const loginData: ILogin = {
        cpf: this.formData.cpf,
        password: this.formData.password,
      };
      this.loginSubmit.emit(loginData);
    }
  }
}
