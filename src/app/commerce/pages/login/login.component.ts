import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommerceService } from '../../services/commerce.service';
import { appFirebase, auth,  } from '../../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public type: string = '';
  public isError: boolean = false;
  public errorLogin: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commerceService: CommerceService,
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.data?.['type'];
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordVerify: ['', this.type === 'register' ? Validators.required : null]
    });
  }

  verifyPassword() {
    const password = this.loginForm.get('password')?.value;
    const passwordVerify = this.loginForm.get('passwordVerify')?.value;

    if (password !== passwordVerify) {
      this.loginForm.get('passwordVerify')?.setErrors({ notMatch: true });
    } else {
      this.loginForm.get('passwordVerify')?.setErrors(null);
    }
  }

  async onSubmit() {
    if(this.type === 'register') {
      const payload = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
        returnSecureToken: true
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
        console.log(userCredential)

      } catch (error: any) {
        this.isError = true;
        if (error.code === 'auth/email-already-in-use') {
          this.errorLogin =  "Correo electrónico ya en uso"
        } else if (error.code === 'auth/invalid-email') {
          this.errorLogin = "Email inválido"
        } else if (error.code === 'auth/weak-password') {
          this.errorLogin = "Contraseña debil"
        } else if (error.code) {
          this.errorLogin = "Algo salió mal"
        }
      }
    } else {
      try {
        const userLog: any = await signInWithEmailAndPassword(auth, this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
        if(userLog) {
          sessionStorage.setItem('apiKey', userLog.user.apiKey)
          sessionStorage.setItem('token', userLog._tokenResponse.idToken)
          this.router.navigate(['/commerce/home']);
        }
      } catch (error: any) {
        this.isError = true;
        if (error.code = 'auth/invalid-credential') {
          this.errorLogin = 'Las credenciales son invalidas'
        }
      }
    }
  }
}
