// Modules
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { FlashMessagesService , FlashMessagesModule } from 'angular2-flash-messages'
 
import { Component, NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component'
import { from } from 'rxjs'

// Services
import { AuthenticationService } from './Services/authentication.service'
import { AuthGuardService } from './Services/auth-guard.service'
import { ValidationService } from './Services/validation.service';

// Components
import { HomeComponent } from './Components/home/home.component'
import { LoginComponent } from './Components/login/login.component'
import { RegisterComponent } from './Components/register/register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { DashboardComponent } from './Components/dashboard-nav/dashboard.component';
import { HomepageNavbarComponent } from './Components/homepage-navbar/homepage-navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdPostComponent } from './Components/ad-post/ad-post.component';
import { PendingPostComponent } from './Components/pending-post/pending-post.component';
import { MyListingsComponent } from './Components/my-listings/my-listings.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ad-post', component: AdPostComponent },
  { path: 'pending-post', component: PendingPostComponent },
  { path: 'my-listings', component: MyListingsComponent }
 
]

@NgModule({
  declarations: [
    AppComponent,
    
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    HomepageNavbarComponent,
    FooterComponent,
    AdPostComponent,
    PendingPostComponent,
    MyListingsComponent
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot() ,
    FlashMessagesModule
  ],
  providers: [AuthenticationService , AuthGuardService , ValidationService , FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
