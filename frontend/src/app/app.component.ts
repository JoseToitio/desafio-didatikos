import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuOpen = false;
  isLoggedIn = false;
  userName = '';
  constructor(private authService: AuthService, private router: Router) {}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit() {
    this.authService.getUserObservable().subscribe(user => {
      this.isLoggedIn = this.authService.isAuthenticated();
      this.userName = user ? user.name : 'Usuário';
    });

    if (this.authService.isAuthenticated()) {
      this.authService.getUserInfo().subscribe();
    }
  }

  checkAuthStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.authService.getUserInfo().subscribe({
        next: (user: User) => {
          this.userName = user.name;
        },
        error: (err) => {
          console.error('Erro ao obter usuário:', err);
          this.userName = 'Usuário';
        }
      });
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
