import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = this.authService.getToken();
        return token ? false : true;
    }
}
