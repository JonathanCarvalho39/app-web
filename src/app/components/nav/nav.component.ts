import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  logout() {
    this.toast.info('Redirecionado ao login', 'Logout')
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

}
