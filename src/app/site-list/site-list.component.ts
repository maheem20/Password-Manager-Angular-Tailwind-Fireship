import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {

  allSites!: Observable<Array<any>>;

  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  formState: string = 'Add New'

  isSuccessful: boolean = false;
  successMessage!: string;

  constructor(private passwordManagerService: PasswordManagerService) { }

  showAlert(message: string) {
    this.successMessage = message;
    this.isSuccessful = true;
  }

  onSubmit(values: object) {
    if (this.formState === 'Add New') {
      this.passwordManagerService.addSite(values)
        .then(() => {
          this.showAlert('Site added successfully');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    else if (this.formState === 'Edit') {
      this.passwordManagerService.updateSite(values, this.siteId)
        .then(() => {
          this.showAlert('Site updated successfully');
        })
        .catch((err: any) => {
          console.log(err);
        });
    }

    console.log(values);
    this.passwordManagerService.addSite(values)
      .then(() => {
        console.log('Site added successfully');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;

    this.formState = 'Edit';
  }

  deleteSite(id: string) {
    this.passwordManagerService.deleteSite(id)
      .then(() => {
        this.showAlert('Site deleted successfully');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
