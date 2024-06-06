import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleRedirectGuard implements CanActivate {
  constructor(private authService: StorageService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole() ?? null;

    if(role ==null) {
        this.router.navigate(['/account/login']);
        return false;
    }

    switch (role) {
      case 1:
      case 2:
        this.router.navigate(['/modules/dashboard']);
        break;
      case 3:
        this.router.navigate(['/modules/reports']);
        break;
      default:
        this.router.navigate(['/forbidden']);
        break;
    }

    return false; // Returning false since navigation is handled within the guard
  }
}
