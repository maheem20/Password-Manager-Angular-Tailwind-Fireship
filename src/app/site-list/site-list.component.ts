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

  constructor(private passwordManagerService: PasswordManagerService) { }

  onSubmit(values: object) {
    console.log(values);
    this.passwordManagerService.addSite(values)
      .then(() => {
        console.log('Site added successfully');
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  loadSites() { }
}
