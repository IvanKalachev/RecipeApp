import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Meal 1',
      'This is a description of meal 1',
      'https://s3.amazonaws.com/finecooking.s3.tauntonclud.com/app/uploads' +
      '/2017/04/18180350/051SIP112-grilled-mustard-rosemary-chicken-recipe-alt-main.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French fries', 20)
      ]
    ),
    new Recipe(
      'Meal 2',
      'This is a description of meal 2',
      'https://sunbasket.com/resources/img/meal-plans/leanclean.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 2)
      ]
    )
  ];

  constructor(private shoppingListServ: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListServ.addIngredients(ingredients);
  }
}
