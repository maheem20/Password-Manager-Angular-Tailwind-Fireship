import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';

import { AES, enc } from 'crypto-js';

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

  formState: string = 'Add New';

  isSuccessful: boolean = false;
  successMessage!: string;

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe((val: any) => {
      this.siteId = val.id;
      this.siteName = val.siteName;
      this.siteURL = val.siteUrl;
      this.siteImgURL = val.siteImgURL;
    });

    this.loadPasswords();
  }

  showAlert(message: string) {
    this.successMessage = message;
    this.isSuccessful = true;
  }

  resetForm() {
    this.email = '';
    this.username = '';
    this.password = '';
    this.passwordId = '';
    this.formState = 'Add New';
  }

  onSubmit(values: any) {

    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;

    if (this.formState === 'Add New') {
      this.passwordManagerService.addPassword(values, this.siteId)
        .then(() => {
          this.showAlert('Data added successfully!');
          this.resetForm();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    else if (this.formState === 'Edit') {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
        .then(() => {
          this.showAlert('Data updated successfully!');
          this.resetForm();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  loadPasswords() {
    this.passwordList = this.passwordManagerService.loadPasswords(this.siteId);
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = 'Edit';
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId)
      .then(() => {
        this.showAlert('Data deleted successfully!');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  encryptPassword(password: string) {
    const secretKey = 'C29E2F7EC27AABE1B73BEF928F619';
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(password: string) {
    const secretKey = 'C29E2F7EC27AABE1B73BEF928F619';
    const decPassword = AES.decrypt(password, secretKey).toString(enc.Utf8);
    return decPassword;
  }

  onDecrypt(password: string) {
    const decPassword = this.decryptPassword(password);
    console.log(decPassword);
  }
}
