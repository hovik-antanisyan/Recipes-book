import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  constructor(private authService: AuthService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
