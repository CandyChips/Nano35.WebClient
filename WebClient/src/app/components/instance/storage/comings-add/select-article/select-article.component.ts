import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {ClientsService} from "../../../../../services/clients.service";
import {TokenService} from "../../../../../services/token.service";
import {ClientsAddDialogComponent} from "../../../clients/clients-add/clients-add.component";
import {StorageService} from "../../../../../services/storage.service";

@Component({
  selector: 'app-select-article',
  templateUrl: './select-article.component.html',
  styleUrls: ['./select-article.component.scss']
})
export class SelectArticleComponent {
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  articles: any;
  filteredArticles: any;

  articleFilterControl = new FormControl();
  selectArticleControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private storageService: StorageService) {

    this.storageService.getAllArticles(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.articles = success;
        this.filteredArticles = this.articleFilterControl.valueChanges
          .pipe(
            startWith(''),
            map(value =>
              this.articles.filter((option: any) =>
                ("+7" + option.phone.toLowerCase() + " " + option.name.toLowerCase())
                  .includes(value.toLowerCase()))
            ));
        this.loaded.emit(false);
        this.selectArticleControl.valueChanges
          .subscribe((data: any) => {
            this.dataChanged.emit(data);
        })
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
      this.storageService.getAllArticles(this.tokenService.currentInstanceId)
        .subscribe((success: any) => {
            this.articles = success;
            this.filteredArticles = this.articleFilterControl.valueChanges
              .pipe(
                startWith(''),
                map(value =>
                  this.articles.filter((option: any) =>
                    ("+7" + option.phone.toLowerCase() + " " + option.name.toLowerCase())
                      .includes(value.toLowerCase()))
                ));
            this.loaded.emit(false);
            this.selectArticleControl.valueChanges
              .subscribe((data: any) => {
                this.dataChanged.emit(data);
              })
          },
          (error: any) => {});
      console.log(`Dialog result: ${result}`);
    });
  }
}
