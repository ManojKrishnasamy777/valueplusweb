import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonHelperService } from 'src/Helper/common-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  userInfo: any;
  constructor(
    private helper: CommonHelperService,
    private router: Router,
  ) { }
  async canActivate(): Promise<boolean> {
    this.userInfo = await this.helper.getUserInfo();
    if(!this.userInfo) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  canMatch(currentUser: any): boolean {
    return true;
  }

}

export const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(AuthGuard).canActivate();
};
