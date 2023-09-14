import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent {

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((val: any) => {
      console.log(val);
    });
  }
}
