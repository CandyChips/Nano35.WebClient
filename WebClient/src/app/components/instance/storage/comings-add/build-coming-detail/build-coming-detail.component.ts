import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {TokenService} from "../../../../../services/token.service";
import {StorageService} from "../../../../../services/storage.service"
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-build-coming-detail',
  templateUrl: './build-coming-detail.component.html',
  styleUrls: ['./build-coming-detail.component.scss']
})
export class BuildComingDetailComponent {
  form!: FormGroup;
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  items: any;
  filteredItems: any;

  itemFilterControl = new FormControl();
  itemSelectControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private storageService: StorageService) {

    this.storageService.getAllStorageItems(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.items = success;
        this.filteredItems = this.itemFilterControl.valueChanges.pipe(
          startWith(''),
          map(value =>
            this.items.filter((option: any) => (option.model.toLowerCase() + " " + option.brand.toLowerCase()).includes(value.toLowerCase()))
          ));
        this.form = this.formBuilder.group({
          newId: [
            Guid.create().toString(),
            [Validators.required]
          ],
          storageItemId: [
            this.tokenService.currentInstanceId,
            [Validators.required]
          ],
          placeOnStorage: [
            "",
            [Validators.required]
          ],
          count: [
            "",
            [Validators.required]
          ],
          price: [
            "",
            [Validators.required]
          ]
        });
        this.loaded.emit(false);
        this.itemSelectControl.valueChanges.subscribe((data: any) => {
          console.log(data);
        })
    });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  pushDetail() {
    this.dataChanged.emit(this.form.value);
  }

  storageItemIdChange(data: any) {
    this.form.controls.storageItemId.setValue(data);
  }
}
