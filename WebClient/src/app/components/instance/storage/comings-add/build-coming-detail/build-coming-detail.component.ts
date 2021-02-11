import {Component, EventEmitter, Input, Output} from '@angular/core';
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

    this.form = this.formBuilder.group({
      newId: [
        Guid.create().toString(),
        [Validators.required]
      ],
      stringItemId: [
        "",
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


    this.storageService.getAllStorageItems(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.items = success;
        this.filteredItems = this.itemFilterControl.valueChanges.pipe(
          startWith(''),
          map(value =>
            this.items.filter((option: any) =>
              (option.model.toLowerCase() + " " + option.brand.toLowerCase())
                .includes(value.toLowerCase()))
          ));
        this.itemSelectControl.valueChanges.subscribe((data: any) => {

        })
    });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  pushDetail() {
    this.dataChanged.emit(this.form.value);
    console.log(this.form.value)
  }

  storageItemChanged(data: any) {
    this.form.controls.stringItemId.setValue(data.id);
  }
}
