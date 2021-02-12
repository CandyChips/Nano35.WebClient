import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {TokenService} from "../../../../../services/token.service";
import {StorageInstanceAddComponent} from "../../storage-add/storage-add-insatnce.component";
import {StorageService} from "../../../../../services/storage.service";

@Component({
  selector: 'app-select-storage-item',
  templateUrl: './select-storage-item.component.html',
  styleUrls: ['./select-storage-item.component.scss']
})
export class SelectStorageItemComponent {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  isLoading = true;

  items: any;
  filteredItems: any;

  itemFilterControl = new FormControl();
  itemSelectControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private storageService: StorageService) {

    this.storageService.getAllStorageItems(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.items = success;
        this.filteredItems = this.itemFilterControl.valueChanges.pipe(
          startWith(''),
          map(value =>
            this.items.filter((option: any) =>
              (option.article.model.toLowerCase() + " " + option.article.brand.toLowerCase())
                .includes(value.toLowerCase()))
          ));
        this.isLoading = false;
      });
    this.itemSelectControl.valueChanges
      .subscribe((data: any) => {
        this.dataChanged.emit(data);
      })
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }

  openAddStorageItemDialog() {
    const dialogRef = this.dialog.open(StorageInstanceAddComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.storageService.getAllStorageItems(this.tokenService.currentInstanceId).subscribe((success: any) => {
        this.items = success;
        this.filteredItems = this.itemFilterControl.valueChanges.pipe(
          startWith(''),
          map(value =>
            this.items.filter((option: any) => (option.article.model.toLowerCase() + " " + option.article.brand.toLowerCase()).includes(value.toLowerCase()))
          ));
      });
      this.isLoading = false;
    });
  }
}
