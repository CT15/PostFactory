import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registerUser() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Validate Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }
    this.name = "YOO";
    // Register User
    this.authService.registerUser(user).subscribe((data) => {
      this.name = "YEE";
      if(data.success) {
        this.flashMessage.show('You are now registered and can now log in', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong ... somewhere', { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/register']);
      }
    })
  }

}
