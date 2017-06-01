import {NgModule} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from '../app-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@NgModule({
    declarations: [HomeComponent, HeaderComponent],
    imports: [AppRoutingModule, SharedModule],
    exports: [HeaderComponent, AppRoutingModule],
    providers: [
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthService
    ]
})
export class CoreModule {

}

