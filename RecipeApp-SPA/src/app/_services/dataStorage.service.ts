import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { RecipesService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

constructor(private http: Http, private recipeService: RecipesService) { }

storeRecipes() {
  return this.http.put('https://ng-recipe-book-37512.firebaseio.com/recipes.json', this.recipeService.getRecipes());
}

getRecipes() {
    this.http.get('https://ng-recipe-book-37512.firebaseio.com/recipes.json').pipe(map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']){
            console.log()
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ))
    .subscribe(
      (recipes: Recipe[]) => {
    this.recipeService.setRecipes(recipes);
      }
    );
  }
}
