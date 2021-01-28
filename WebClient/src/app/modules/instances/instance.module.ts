import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InstanceComponent} from "./instance.component";
import {InstanceRoutingModule} from "./instance-routing.module";
import {HomeInstanceComponent} from "../../components/instance/home/home-insatnce.component";
import {WorkersInstanceComponent} from "../../components/instance/Workers/workers-insatnce.component";
import {MaterialModule} from "../common/app-material.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [
    InstanceComponent,
    HomeInstanceComponent,
    WorkersInstanceComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InstanceRoutingModule,
    MaterialModule
  ],
  providers: []
})
export class InstanceModule { }
