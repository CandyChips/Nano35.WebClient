import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {map, startWith} from "rxjs/operators";
import {TokenService} from "../../../../../services/token.service";
import {StorageService} from "../../../../../services/storage.service";
import {ArticleAddDialogComponent} from "../../article-add/article-add.component";

@Component({
  selector: 'app-select-article',
  templateUrl: './select-article.component.html',
  styleUrls: ['./select-article.component.scss']
})
export class SelectArticleComponent {
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>();

  isLoading = true;

  articles: any;
  filteredArticles: any;

  articleFilterControl = new FormControl();
  selectArticleControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    private tokenService: TokenService,
    private storageService: StorageService) {

    this.isLoading = true;
    this.storageService.getAllArticles(this.tokenService.currentInstanceId)
      .subscribe((success: any) => {
        this.articles = success;
        this.filteredArticles = this.articleFilterControl.valueChanges
          .pipe(
            startWith(''),
            map(value =>
              this.articles.filter((option: any) =>
                (option.category.toLowerCase() + " " + option.brand.toLowerCase() + " " + option.model.toLowerCase())
                  .includes(value.toLowerCase()))
            ));
        this.selectArticleControl.valueChanges
          .subscribe((data: any) => {
            this.dataChanged.emit(data);
        });
        this.isLoading = false;
      },
      (error: any) => {});
  }

  openAddClientDialog() {
    const dialogRef = this.dialog.open(ArticleAddDialogComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isLoading = true;
      this.storageService.getAllArticles(this.tokenService.currentInstanceId)
        .subscribe((success: any) => {
            this.articles = success;
            this.filteredArticles = this.articleFilterControl.valueChanges
              .pipe(
                startWith(''),
                map(value =>
                  this.articles.filter((option: any) =>
                    (option.category.toLowerCase() + " " + option.phone.toLowerCase() + " " + option.name.toLowerCase())
                      .includes(value.toLowerCase()))
                ));
            this.selectArticleControl.valueChanges
              .subscribe((data: any) => {
                this.dataChanged.emit(data);
              });
            this.isLoading = false;
          },
          (error: any) => {});
    });
  }

  handleInput(event: KeyboardEvent): void{
    event.stopPropagation();
  }
}
