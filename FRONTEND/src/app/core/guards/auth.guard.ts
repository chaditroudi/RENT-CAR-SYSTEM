import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { AuthService } from "../services/auth.service";
import { StorageService } from "../services/storage.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const userRole = this.getUserRole();

    try {
      const isAuthenticated = localStorage.getItem("user_connected");

      if (isAuthenticated) {
        const requiredRole = route.data["roles"] ;


          if (requiredRole.includes(userRole)) { 
            return true;
          } else {
            this.router.navigate(["/forbidden"]);
            return false;
          }
        
      } else {
        this.router.navigate(["/account/login"]);
        return false;
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      return this.router.createUrlTree(["/error"]);
    }
  }

  private getUserRole(): string {
    // Implement logic to retrieve the user role from storage or service
    const userRoleString = localStorage.getItem("user_role");
    return userRoleString || ""; // Return empty string if not found
  }
}
