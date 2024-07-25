import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService) { }
 user = {localId:"",displayName:""}
  ngOnInit(): void {
    this.auth.canaccess();
    if (this.auth.isAuthenticated()) {
      //call user details service
      this.auth.detail().subscribe({
        next:data=>{
            this.user.localId = data.users[0].localId;
            this.user.displayName= data.users[0].displayName;
        }
      })
  }
  }

}
