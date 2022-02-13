import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../service/user-model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  regForm!: FormGroup;
  datasaved = false;
  massage: string ='';
  message:string ='';
  userList:any=[];
  userModelObj: UserModel = new UserModel();
  constructor(private fb: FormBuilder,private router:Router,private service:UserService) { }

  ngOnInit(): void {
    this.setFormState();
  }
  setFormState(): void {
    this.regForm = this.fb.group({
      fullName: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      age: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  postUserDetails() {
    this.userModelObj.fullName = this.regForm.value.fullName;
    this.userModelObj.mobileNo = this.regForm.value.mobileNo;
    this.userModelObj.email = this.regForm.value.email;
    this.userModelObj.address = this.regForm.value.address;
    this.userModelObj.age = this.regForm.value.age;
    this.userModelObj.password = this.regForm.value.password;
    this.service.postUserData(this.userModelObj).subscribe(result => {
      console.log(result);
      alert("User Record Added Successfully!");
      this.regForm.reset();
      this.router.navigate(['/user']);
    }, (err) => {
      alert("Something Wrong in Saving User Details");
    });
  }
  allowedOnlyNo(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  allowOnlyAlphabets(event: any) {
    const pattern = /[a-zA-Z\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  allowNumbersAndAlphabets(event: any) {
    const pattern = /[a-z A-Z 0-9 \&\$\@\#\%\* ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  validateEmail(email: any) {
    const emailPattern = /^[A-Za-z._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    return emailPattern.test(String(email).toLowerCase());
  }
  resetregForm(){
    this.regForm.reset();
  }
}
