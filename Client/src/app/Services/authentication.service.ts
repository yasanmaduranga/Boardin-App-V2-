import { Injectable } from '@angular/core'
import { from } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Observable , of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router' 



// @Injectable({
//   providedIn: 'root'
// })

export interface UserDetails {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  exp: number
  iat: number
}

interface TokenResponse{
  token: string
}

export interface TokenPayLoad {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient , private router: Router) { }

  private saveToken (token: string): void {
    localStorage.setItem('userToken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('userToken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload 
    if(token) {
      payload = token.split('.')[1]
      // console.log(payload)
      payload = window.atob(payload)
      // console.log(payload)
      return JSON.parse(payload) 
    }else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if(user) {
      return user.exp > Date.now() / 1000
    }else {
      return false
    }
  }

  // registration for a client
  public register (user: any): Observable<any> {
    const base = this.http.post('http://localhost:3000/users/register',user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }


  // login for a user
  public login (user: any): Observable<any> {
    const base = this.http.post('http://localhost:3000/users/login',user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public profile(): Observable<any> {
    return this.http.get('http://localhost:3000/users/profile', {
      headers: { authorization: `${this.getToken()}`}
    })
  }


  


  public isAdmin () : boolean {
    const user = this.getUserDetails();
    if(user.role == "admin"){
      return true;
    }else{
      return false;
    }
  }

}
