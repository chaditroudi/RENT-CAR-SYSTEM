// role-resolver.service.ts
import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleResolver implements Resolve<string> {
  constructor(private authService: StorageService, private router: Router) {}

  resolve(): string {
    const role = this.authService.getRole();
    if (role === 1 || role === 2) {
      return '/modules/dashboard';
    } else if (role === 3) {
      return '/modules/report';
    } else {
      // Handle other roles or unauthenticated users
      return '/not-authorized';
    }
  }
}
