import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { MenuItem, MessageService ,ConfirmEventType} from 'primeng/api';
import { User } from 'src/app/model/User';
import { ToastrService } from 'ngx-toastr';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allUsersResponse: any[];
  allUsersResponse1: User[];
  userId:any;
  selectedUser:User;
  userData= new User();
  scrollableCols: any[];
  items: MenuItem[];
  display: boolean = false;
  displayUpdate: boolean = false;
  date:Date;
  userResponseByUserId:any;
    
  id:number;
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

  constructor(private userService:UserService, private toastrService:ToastrService,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAllUsersData();

    this.items = [
      {label: 'Edit', icon: 'pi pi-fw pi-pencil', command: () => this.showUpdateDialog()},
      {label: 'Delete', icon: 'pi pi-fw pi-times', command: () => this.confirm2()}
  ];
  }

  getAllUsersData() {
    this.userService.getAllUsers().subscribe(response => {
      this.allUsersResponse = response['data'];
    })
  }

  editUser(){
    this.userData.userId=this.selectedUser.userId;
    this.userData.name=this.name;
    console.log("1")
    this.userData.surname=this.surname;
    console.log("2")
    this.userData.email=this.email;
    console.log("3")
    this.userData.city=this.city;
    this.userData.contactNumber=this.contactNumber;
    this.userData.designation=this.designation;
    this.userData.dob=this.dob;
    this.userData.joiningDate=this.joiningDate;
    this.userData.password=this.password;
    this.userData.pinCode=this.pinCode;

    this.userService.saveUser(this.userData).subscribe(response=>{ 
      if(response['data']=="Success"){
        this.toastrService.success('User Updated Successfully....!');
        this.hideDialog();
        this.getAllUsersData();
      }else{
        this.toastrService.warning(response['messageList']);
        this.hideDialog();
      }
    })
  }

  deleteUser(){
    this.userService.deleteUser(this.selectedUser.id).subscribe(response=>{
      console.log(response);
      if(response['message']=="Success"){
        this.toastrService.success('User delete Successfully....!');
        this.getAllUsersData();
      }else{

      }
    })
  }

  showDialog() {
    this.display = true;
}

showUpdateDialog() {
  this.displayUpdate = true;
  this.userId=this.selectedUser.userId;
  this.userService.getByUserId(this.userId).subscribe(respose=>{
      this.userResponseByUserId=respose['data'];
      this.name=this.userResponseByUserId.name;
      this.surname=this.userResponseByUserId.surname;
      this.email=this.userResponseByUserId.email;
      this.password=this.userResponseByUserId.password;
      this.city=this.userResponseByUserId.city;
      this.dob=this.userResponseByUserId.dob;
      this.designation=this.userResponseByUserId.designation;
      this.contactNumber=this.userResponseByUserId.contactNumber;
      this.pinCode=this.userResponseByUserId.pinCode;
      this.joiningDate=this.userResponseByUserId.joiningDate;
  })
}

hideDialog() {
  this.display = false;
  this.displayUpdate=false;
}

  addUser(){
    console.log(this.name)
    this.userData.name=this.name;
    console.log("1")
    this.userData.surname=this.surname;
    console.log("2")
    this.userData.email=this.email;
    console.log("3")
    this.userData.city=this.city;
    this.userData.contactNumber=this.contactNumber;
    this.userData.designation=this.designation;
    this.userData.dob=this.dob;
    this.userData.joiningDate=this.joiningDate;
    this.userData.password=this.password;
    this.userData.pinCode=this.pinCode;

    this.userService.saveUser(this.userData).subscribe(response=>{ 
      if(response['data']=="Success"){
        this.toastrService.success('User Register Successfully....!');
        this.hideDialog();
        this.getAllUsersData();
      }else{
        this.toastrService.warning(response['messageList']);
        this.hideDialog();
      }
    })
  }

  clearModel(){
    this.name="";
    this.surname="";
    this.email="";
    this.password="";
    this.city="";
    this.contactNumber="";
    this.pinCode="";
    this.dob="";
    this.joiningDate="";
    this.designation="";
  }

  confirm2() {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deleteUser();
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}
}
