import {Component} from '@angular/core';
import {Response} from '@angular/http';

import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
    isAuth = this.authService.isAuthentincated();

    constructor(private dsService: DataStorageService, private authService: AuthService) {}

    onSaveData() {
        this.dsService.storeRecipe().subscribe(
            (recipes: Response) => {console.log(recipes); },
            (error: Response) => {console.log(error); }
        );
    }

    onFetchData() {
        this.dsService.getRecipe();
    }

    onLogOut() {
        this.authService.logOut();
    }
}


