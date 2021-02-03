import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeInstanceComponent} from "../../components/instance/home/home-insatnce.component";
import {NotFoundComponent} from "../../components/common/not-found/not-found.component";
import {WorkersInstanceComponent} from "../../components/instance/workers/workers-insatnce.component";
import {UnitsInstanceComponent} from "../../components/instance/units/units-insatnce.component";
import {StorageInstanceComponent} from "../../components/instance/storage/storage-insatnce.component";
import {ClientsInstanceComponent} from "../../components/instance/clients/clients-insatnce.component";

const routes: Routes = [
  { path: '', component: HomeInstanceComponent},
  { path: 'workers', component: WorkersInstanceComponent},
  { path: 'units', component: UnitsInstanceComponent},
  { path: 'storage', component: StorageInstanceComponent},
  { path: 'clients', component: ClientsInstanceComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstanceRoutingModule { }
