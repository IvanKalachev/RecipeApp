import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RecipesService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.httpClient.put(
      'https://ng-recipe-book-37512.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        observe: 'body',
        // params: new HttpParams().set('auth', token) -> goes to Interceptor
      }
    );

    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-37512.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), { reportProgress: true, params: new HttpParams().set('auth', token) });

    // return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.httpClient
      .get<Recipe[]>(
        'https://ng-recipe-book-37512.firebaseio.com/recipes.json',
        {
          observe: 'body',
          responseType: 'json',
          // params: new HttpParams().set('auth', token) -> goes to Interceptor
        }
      )
      .pipe(
        map(recipes => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log();
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
