import { Component, OnInit, Input, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor () { }
  
  ngOnInit(): void {
    // console.log(this.auth.isLoggedIn());
  }

}
