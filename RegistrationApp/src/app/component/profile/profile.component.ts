import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userName:string;
  token:string;
  isDisabled = true;
  disabled = true;
  public updateUser: User;
  userData=new User();

  name:string;
  surname:string;
  email:string;
  password:string;
  city:string;
  designation:string;
  joiningDate:any;
  contactNumber:any;
  dob:any;
  pinCode:any;
  role:string;
  profileName:string;
  profileSurname:string

  constructor(private router: Router,private userService:UserService, private toastrService:ToastrService, private messageService: MessageService) {
   }

  ngOnInit(): void {
    this.getProfile();
    this.token = localStorage.getItem('token');
  }

  getProfile(){
    this.userName=localStorage.getItem('userName');
    this.userService.getByUserId(this.userName).subscribe(response=>{
      console.log(response);
      this.profileName=response['data']['name'];
      this.name=response['data']['name'];
      this.userName=response['data']['userId'];
      this.profileSurname=response['data']['surname'];
      this.surname=response['data']['surname'];
      this.dob=response['data']['dob'];
      this.city=response['data']['city'];
      this.email=response['data']['email'];
      this.contactNumber=response['data']['contactNumber'];
      this.designation=response['data']['designation'];
      this.joiningDate=response['data']['joiningDate'];
      this.pinCode=response['data']['pinCode'];
      this.password=response['data']['password'];
      this.role=response['data']['role'];
    })
  }
  
  logout(){
    localStorage.clear();
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
    this.toastrService.success('Logout Successfully....!');
  }

  editFeild(){
    this.disabled=false;
  }

  editUser(){
    this.disabled=true;
    this.userData.userId=this.userName;
    this.userData.name=this.name;
    this.userData.surname=this.surname;
    this.userData.email=this.email;
    this.userData.city=this.city;
    this.userData.contactNumber=this.contactNumber;
    this.userData.designation=this.designation;
    this.userData.dob=this.dob;
    this.userData.joiningDate=this.joiningDate;
    this.userData.password=this.password;
    this.userData.pinCode=this.pinCode;
    this.userData.role=this.role
    this.userService.saveUser(this.userData).subscribe(response=>{
        console.log(response);
        this.toastrService.success('User is Updated Successfully....!');
        this.getProfile();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.toastrService.error('User is not Updated Successfully....!');
      }
    );
  }
}
