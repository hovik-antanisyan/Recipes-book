import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBvLFvGq7mlTpRlar-79ymVl50Zyq67SLI',
            authDomain: 'udemy-ng-http-d7dce.firebaseapp.com'
        });
    }
}
