import { Component, OnInit , ViewChild} from '@angular/core';
import { AlertService, AuthenticationService } from '../../_services/index';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  	loggedIn =false
  constructor(         
        private authenticationService: AuthenticationService,
        private alertService: AlertService
  ) { }

  OnSubmit(){
  		console.log("accept",this.loginForm);        

	    const reqObj = {
	      body: this.loginForm.value,
	      uri: '/login',
	    };
	    this.authenticationService.post(reqObj)
	      .subscribe(data => {
	        if (data.status) {
				this.loggedIn = true;
	        }
	      },err=>console.log(err)); 
  }

   Signup(){
  		console.log("accept",this.loginForm); 
	    const reqObj = {
	      body: this.signupForm.value,
	      uri: '/register',
	    };
	    this.authenticationService.post(reqObj)
	      .subscribe(data => {
	        if (data.status) {
				this.loggedIn = false;
	        }
	      },err=>console.log(err)); 
  }

  onLogout(){
		this.loggedIn = false;
  }

  ngOnInit() {	
		  this.loginForm = new FormGroup({      	
		      	email: new FormControl(),
		      	password: new FormControl(),
		      	rememberme: new FormControl()
		    }); 

		  this.signupForm = new FormGroup({      	
		      	username: new FormControl(),
		      	email: new FormControl(),
		      	password: new FormControl()
		    }); 		    
  }

  ngAfterViewInit() {
  	$('#headerSignUp').on('click', function(e) {
		e.preventDefault();
		console.log($('#headerAccount'));
		$('#headerAccount').addClass('signup').removeClass('signin').removeClass('recover');
		$('#headerAccount').find('.signup-form input:first').focus();
	});

	$('#headerSignIn').on('click', function(e) {
		e.preventDefault();
		$('#headerAccount').addClass('signin').removeClass('signup').removeClass('recover');
		$('#headerAccount').find('.signin-form input:first').focus();
	});

	$('#headerRecover').on('click', function(e) {
		e.preventDefault();
		$('#headerAccount').addClass('recover').removeClass('signup').removeClass('signin');
		$('#headerAccount').find('.recover-form input:first').focus();
	});

	$('#headerRecoverCancel').on('click', function(e) {
		e.preventDefault();
		$('#headerAccount').addClass('signin').removeClass('signup').removeClass('recover');
		$('#headerAccount').find('.signin-form input:first').focus();
	}); 
  }

}
