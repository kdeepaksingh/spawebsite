import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {

  constructor(private service: UserService) { }
  userDetails: any = [];
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.service.getUserData().subscribe(result => {
      console.log(result);
      this.userDetails = result;
    });
  }
}
