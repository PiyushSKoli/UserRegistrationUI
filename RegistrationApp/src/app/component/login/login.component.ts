import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Login } from 'src/app/model/login';
import { UserRole } from 'src/app/model/UserRole';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRoles: UserRole[];
  selectedUserRole: UserRole;
  loginResponse:any;
  loginData=new Login();

  userName:string;
  password:string;
  userRole:string;

  token:string;

  constructor(private router: Router,private service:UserService,private toastrService:ToastrService,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.userRoles=[
      {role:'Admin'},
      {role:'User'}
    ];
   }

  ngOnInit(): void {
  }

  login(){
    this.loginData.userRole=this.selectedUserRole.role;
    this.loginData.userName=this.userName;
    this.loginData.password=this.password;
    this.service.login(this.loginData).subscribe(response=>{
      if(response['message']=="Success"){
        if(response['data']['userRole']=='Admin'){
          this.router.navigateByUrl('/admin');
          this.toastrService.success('Login Successfully....!');
          localStorage.setItem('token',(response['data']['token']));
          localStorage.setItem('userName',response['data']['userName']);
          localStorage.setItem('userRole',response['data']['userRole']);
        }else{
          this.router.navigateByUrl('/profile');
          this.toastrService.success('Login Successfully....!');
          localStorage.setItem('token',(response['data']['token']));
          localStorage.setItem('userName',response['data']['userName']);
          localStorage.setItem('userRole',response['data']['userRole']);
        }
      }else{
        this.toastrService.error("Incorrect Username/Password");
      }
    })
  }

}
