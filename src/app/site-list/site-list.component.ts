import { Component } from '@angular/core';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent {
  onSubmit(values: object) {
    console.log(values);
  }
}
