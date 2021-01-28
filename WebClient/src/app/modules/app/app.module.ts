import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SignInComponent} from "../../components/app/sign-in/sign-in.component";
import {HomeComponent} from "../../components/app/home/home.component";
import {NavBarComponent} from "../../components/app/nav-bar/nav-bar.component";
import {ProfileComponent} from "../../components/app/profile/profile.component";
import {InstancesComponent} from "../../components/app/instances/instances.component";
import {SignUpComponent} from "../../components/app/sign-up/sign-up.component";
import {MaterialModule} from "../common/app-material.component";
import {TokenService} from "../../services/token.service";
import {JwtInterceptor} from "../../helper/jwt.interceptor";
import {NotFoundComponent} from "../../components/common/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    NavBarComponent,
    ProfileComponent,
    InstancesComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
