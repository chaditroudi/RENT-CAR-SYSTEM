
    import { StorageService } from './../services/storage.service';
    import { Injectable } from '@angular/core';
    import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
    import { Observable } from 'rxjs';
    
    @Injectable({
      providedIn: 'root'
    })
    
    export class RedirectGuard implements CanActivate {
    
    
      
        constructor(private router: Router, private authService: StorageService) {}
    
      canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
          Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoggedIn =  this.authService.getIsLoggedIn();
        let role = this.authService.getRole();

        
          
        if (isLoggedIn) {
            role == 1 ? this.router.navigate(["/modules/dashboard"]) :
        role == 2 ? this.router.navigate(["/modules/dashboard"]) :
        
        role == 3 ? this.router.navigate(["/modules/reports"]) : null;

        return true;

        }else return false;
      }
    }
