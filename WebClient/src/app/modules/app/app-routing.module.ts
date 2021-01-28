import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../../components/app/home/home.component";
import {SignInComponent} from "../../components/app/sign-in/sign-in.component";
import {SignUpComponent} from "../../components/app/sign-up/sign-up.component";
import {ProfileComponent} from "../../components/app/profile/profile.component";
import {InstancesComponent} from "../../components/app/instances/instances.component";
import {AuthGuard} from "../../guards/auth.guard";
import {InstanceComponent} from "../instances/instance.component";
import {InstanceTypeGuard} from "../../guards/instance-type.guard";
import {NotFoundComponent} from "../../components/common/not-found/not-found.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'instances', component: InstancesComponent, canActivate: [AuthGuard]},
  {
    path: 'instance',
    loadChildren: () => import('src/app/modules/instances/instance.module').then(m => m.InstanceModule),
    component: InstanceComponent,
    canActivate: [AuthGuard, InstanceTypeGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
