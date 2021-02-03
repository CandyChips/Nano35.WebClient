import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InstanceComponent} from "./instance.component";
import {InstanceRoutingModule} from "./instance-routing.module";
import {HomeInstanceComponent} from "../../components/instance/home/home-insatnce.component";
import {MaterialModule} from "../common/app-material.component";
import {CommonModule} from "@angular/common";
import {WorkersInstanceViewComponent} from "../../components/instance/workers/workers-view/workers-view-insatnce.component";
import {WorkersInstanceAddComponent} from "../../components/instance/workers/workers-add/workers-add-insatnce.component";
import {WorkersInstanceComponent} from "../../components/instance/workers/workers-insatnce.component";
import {UnitsInstanceComponent} from "../../components/instance/units/units-insatnce.component";
import {UnitsInstanceAddComponent} from "../../components/instance/units/units-add/units-add-insatnce.component";
import {UnitsInstanceViewComponent} from "../../components/instance/units/units-view/units-view-insatnce.component";
import {UnitsInstanceDetailsComponent} from "../../components/instance/units/units-details/units-details-insatnce.component";
import {StorageInstanceComponent} from "../../components/instance/storage/storage-insatnce.component";
import {StorageInstanceViewComponent} from "../../components/instance/storage/storage-view/storage-view-insatnce.component";
import {StorageInstanceAddComponent} from "../../components/instance/storage/storage-add/storage-add-insatnce.component";
import {ArticleAddDialogComponent} from "../../components/instance/storage/article-add/article-add.component";
import {WarehouseViewInsatnceComponent} from "../../components/instance/storage/warehouse-view/warehouse-view-insatnce.component";
import {ComingsViewInsatnceComponent} from "../../components/instance/storage/comings-view/comings-view-insatnce.component";
import {ComingsAddInsatnceComponent} from "../../components/instance/storage/comings-add/comings-add-insatnce.component";
import {ClientsInstanceComponent} from "../../components/instance/clients/clients-insatnce.component";
import {ClientsAddDialogComponent} from "../../components/instance/clients/clients-add/clients-add.component";
import {ClientsViewInsatnceComponent} from "../../components/instance/clients/clients-view/clients-view-insatnce.component";

@NgModule({
  declarations: [
    InstanceComponent,
    HomeInstanceComponent,

    WorkersInstanceComponent,
    WorkersInstanceViewComponent,
    WorkersInstanceAddComponent,

    ClientsInstanceComponent,
    ClientsViewInsatnceComponent,
    ClientsAddDialogComponent,

    UnitsInstanceComponent,
    UnitsInstanceAddComponent,
    UnitsInstanceDetailsComponent,
    UnitsInstanceViewComponent,

    StorageInstanceComponent,
    StorageInstanceViewComponent,
    StorageInstanceAddComponent,
    ArticleAddDialogComponent,
    WarehouseViewInsatnceComponent,
    ComingsViewInsatnceComponent,
    ComingsAddInsatnceComponent
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
