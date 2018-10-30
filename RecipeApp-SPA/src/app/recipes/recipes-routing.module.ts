import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { Routes, RouterModule } from '@angular/router';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent,
    children: [
        { path: '', component: RecipesStartComponent, pathMatch: 'full' },
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})
export class RecipesRoutingModule {}
