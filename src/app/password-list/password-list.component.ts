import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  siteId!: string;
  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;

  passwordList!: Observable<Array<any>>;

  email!: string;
  username!: string;
  password!: string;
  passwordId!: string;

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteUrl;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPasswords();
  }

  onSubmit(values: object) {
    this.passwordManagerService.addPassword(values, this.siteId)
      .then(() => {
        console.log('Password added successfully!');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  loadPasswords() {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId);
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;
  }
}
