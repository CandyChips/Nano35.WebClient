import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeInstanceComponent} from "../../components/instance/home/home-insatnce.component";
import {WorkersInstanceComponent} from "../../components/instance/Workers/workers-insatnce.component";
import {NotFoundComponent} from "../../components/common/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: HomeInstanceComponent},
  { path: 'workers', component: WorkersInstanceComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstanceRoutingModule { }
