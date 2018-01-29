package com.teej107.virtualpantry.web

import com.teej107.virtualpantry.db.Recipe
import java.net.URL

/**
 * Created by teej107 on 1/27/2018.
 */
class RecipeView(recipe: Recipe, link: String) {

    val title: String? = recipe.title
    val href: String? = link
    val image: URL? = recipe.image
}