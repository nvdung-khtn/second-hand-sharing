import { Component, OnInit } from '@angular/core';
import { AuthClient } from 'src/app/core/api-clients/auth.client';

@Component({
  selector: 'app-auth-register-form',
  templateUrl: './auth-register-form.component.html',
  styleUrls: ['./auth-register-form.component.scss']
})
export class AuthRegisterFormComponent implements OnInit {
  formData = {
    userName: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dob: "",
    phoneNumber: "",
    address: "",
    email: "",
  };

  private isSuccess:boolean;
  constructor(private authClient: AuthClient) { }

  ngOnInit(): void {
  }

  handleInput(data) {
    this.formData[`${data.type}`] = data.value;
    console.log("test: ", this.formData);
  }

  async onSubmit() {
    const response = await this.authClient.register(this.formData);
    this.authClient.register(this.formData).subscribe(
      (data) => {
        this.isSuccess = true;
        console.log(data);
      },
      (err) => {
        this.isSuccess = false;
        console.log(err);
      }
    );
  }
}
