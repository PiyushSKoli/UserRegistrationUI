import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:string;
  token:string;
  constructor(private router: Router,private userService:UserService, private toastrService:ToastrService, private messageService: MessageService) {
   }

  ngOnInit(): void {
    this.getProfile();
    this.token = localStorage.getItem('token');
  }

  getProfile(){
    console.log(this.token = localStorage.getItem('token'));
    console.log(this.token = localStorage.getItem('userName'));
    this.userName=localStorage.getItem('userName');
    this.userService.getByUserId(this.userName).subscribe(response=>{
      console.log(response);
    })
  }
  
  logout(){
    localStorage.clear();
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
    this.toastrService.success('Logout Successfully....!');
  }

}
