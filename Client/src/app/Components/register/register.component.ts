import { Component, OnInit } from '@angular/core'
import { from } from 'rxjs'
import { AuthenticationService , TokenPayLoad } from '../../Services/authentication.service'
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidationService } from 'src/app/Services/validation.service'
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName:string
  lastName:string
  email:string
  password:string
  role:string
  phoneNumber: string

  constructor(public auth: AuthenticationService , private router: Router, private val:ValidationService,private flash:FlashMessagesService ,private toastr: ToastrService) { }

  register() {
    const credentials= {
      firstName: this.firstName,
      lastName: this.lastName,
      email:this.email,
      password:this.password,
      phoneNumber: this.phoneNumber,
      role: 'client'
    }



    if(!this.val.validatingRegister(credentials)){
      console.log('fill all')
      this.flash.show('*** Please fill all the fields ***', {cssClass:'alert-danger',timeout:3000})

      //




      //
      return false
    }

    if(!this.val.validatingEmail(credentials.email)){
      console.log('invalid email')
      this.flash.show('*** Entered Email is invalid ***', {cssClass:'alert-danger',timeout:3000})
      
      return false
    }

    if(!this.val.validatingPassword(credentials.password)){
      this.flash.show('*** 6 - 10 characters should be in your password ***', {cssClass:'alert-danger',timeout:3000})
      console.log('invalid password')
      return false
    }



    this.auth.register(credentials).subscribe(user=> {
      if(user.success){
        this.router.navigateByUrl('/login')
        this.toastr.success("registered successfully ","",{
          timeOut: 2000,
        });
        // alert('registered successfully')
      }else{
        // this.flash.show(user.message, {cssClass:'alert-danger',timeout:3000})
        this.toastr.error(user.message,"",{
          timeOut: 2000,
        });
        console.log(user.message)
      }
    })
  }
  ngOnInit(): void {
  }

}
