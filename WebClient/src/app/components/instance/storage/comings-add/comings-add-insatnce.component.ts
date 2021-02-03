import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../../../services/token.service";
import {IdentityService} from "../../../../services/identity.service";
import {Router} from "@angular/router";
import {UnitsService} from "../../../../services/units.service";
import {Guid} from "guid-typescript";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ArticleAddDialogComponent} from "../article-add/article-add.component";
import {StorageService} from "../../../../services/storage.service";
import {ClientsService} from "../../../../services/clients.service";
import {map, startWith} from "rxjs/operators";
import {ClientsAddDialogComponent} from "../../clients/clients-add/clients-add.component";

@Component({
  selector: 'app-insatnce-comings-add',
  templateUrl: './comings-add-insatnce.component.html',
  styleUrls: ['./comings-add-insatnce.component.scss']
})
export class ComingsAddInsatnceComponent {
  form!: FormGroup;
  isLoading = true;
  error = "";
  clients: any;
  filteredClients: any;

  units: any;

  clientFilterControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private identityService: IdentityService,
    private storageService: StorageService,
    private clientService: ClientsService,
    private router: Router,
    private unitsService: UnitsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ComingsAddInsatnceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.clientService.getAllClients(this.tokenService.currentInstanceSubject.value.id).subscribe(
      (success: any) => {
        this.clients = success;

        this.filteredClients = this.clientFilterControl.valueChanges.pipe(
          startWith(''),
          map(value =>
            this.clients.filter((option: any) => ("+7" + option.phone.toLowerCase() + " " + option.name.toLowerCase()).includes(value.toLowerCase()))
          )
        );
        this.unitsService.getAllUnits(this.tokenService.currentInstanceSubject.value.id, Guid.createEmpty()).subscribe(
          (success: any) => {
            this.units = success;
          },
          (error: any) => {

        })
        this.isLoading = false;
      },
      (error: any) => {

      });
    this.form = this.formBuilder.group({
      newId: [
        Guid.create().toString(),
        [
          Validators.required
        ]
      ],
      instanceId: [
        this.tokenService.currentInstanceSubject.value.id,
        [
          Validators.required
        ]
      ],
      сlientId: [
        "",
        [
          Validators.required
        ]
      ],
      number: [
        "",
        [
          Validators.required
        ]
      ],
      unitId: [
        "",
        [
          Validators.required
        ]
      ],
      comment: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  updateContent() {
    this.isLoading = false;
  }

  openAddArticleDialog(): void {
    const dialogRef = this.dialog.open(ArticleAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateContent();
      console.log(`Dialog result: ${result}`);
    });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  openAddClientDialog() {
    const dialogRef = this.dialog.open(ClientsAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.clientService.getAllClients(this.tokenService.currentInstanceSubject.value.id).subscribe(
        (success: any) => {
          this.clients = success;

          this.filteredClients = this.clientFilterControl.valueChanges.pipe(
            startWith(''),
            map(value =>
              this.clients.filter((option: any) => ("+7" + option.phone.toLowerCase() + " " + option.name.toLowerCase()).includes(value.toLowerCase()))
            )
          );
        },
        (error: any) => {

        });
      console.log(`Dialog result: ${result}`);
    });

  }

  onSubmin() {
    this.isLoading = true;
    console.log(this.form.value)
    //this.storageService.createStorageItem(this.form.value)
    //  .subscribe(
    //    (data: any) => {
    //      this.dialogRef.close();
    //    },
    //    (error: any) => {
    //      this.isLoading = false;
    //      alert(error.error.message)
    //    });
  }
}
