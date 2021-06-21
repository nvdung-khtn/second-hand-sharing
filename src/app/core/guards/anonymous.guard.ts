import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.authService.getToken();
        if (token) {
            this.router.navigateByUrl('/home');
            return false;
        } else { return true; }
    }
}
