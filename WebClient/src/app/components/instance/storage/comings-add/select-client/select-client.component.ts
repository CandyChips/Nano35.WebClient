import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {ClientsService} from "../../../../../services/clients.service";
import {TokenService} from "../../../../../services/token.service";
import {ClientsAddDialogComponent} from "../../../clients/clients-add/clients-add.component";

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['./select-client.component.scss']
})
export class SelectClientComponent {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  isLoading = true;

  clients: any;
  filteredClients: any;

  clientFilterControl = new FormControl();
  selectClientControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private clientService: ClientsService) {

    this.clientService.getAllClients(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.clients = success;
        this.filteredClients = this.clientFilterControl.valueChanges
          .pipe(
            startWith(''),
            map(value =>
              this.clients.filter((option: any) =>
                ("+7" + option.phone.toLowerCase() + " " + option.name.toLowerCase())
                  .includes(value.toLowerCase()))
            ));
        this.selectClientControl.valueChanges
          .subscribe((data: any) => {
            this.dataChanged.emit(data);
        })
        this.isLoading = false;
      },
      (error: any) => {});
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  openAddClientDialog() {
    const dialogRef = this.dialog.open(ClientsAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.clientService.getAllClients(this.tokenService.currentInstanceId)
        .subscribe((success: any) => {
            this.clients = success;
            this.filteredClients = this.clientFilterControl.valueChanges.pipe(
              startWith(''),
              map(value =>
                this.clients.filter((option: any) =>
                  ("+7" + option.phone.toLowerCase() + " " + option.name.toLowerCase())
                    .includes(value.toLowerCase()))
              )
            );
            this.selectClientControl.valueChanges.subscribe((data: any) => {
              this.dataChanged.emit(data);
            })
          },
          (error: any) => {});
      console.log(`Dialog result: ${result}`);
    });
  }
}
