import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RecipesService } from '../_services/recipes.service';
import { ShoppingListService } from '../_services/shopping-list.service';
import { AuthService } from '../_services/auth.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        RecipesService,
        ShoppingListService,
        AuthService
    ]
})
export class CoreModule {}

