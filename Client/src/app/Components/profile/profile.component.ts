import { Component, OnInit } from '@angular/core'
import { from } from 'rxjs'
import { AuthenticationService , UserDetails } from '../../Services/authentication.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  details: UserDetails

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.auth.profile().subscribe(
      user => {
        console.log(user);
        this.details = user;
        // console.log(this.details);
      },
      err => {
        console.error(err);
      }
    )
  }

}
