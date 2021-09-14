import { Injectable } from '@angular/core'
import { from } from 'rxjs'
import { Router , CanActivate } from '@angular/router'
import { AuthenticationService } from './authentication.service'

// @Injectable({
//   providedIn: 'root'
// })

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService , private Router: Router) { }

  canActivate() {
    if(!this.auth.isLoggedIn()) {
      this.Router.navigateByUrl('/')
      return false
    }
    return true
  }
}
