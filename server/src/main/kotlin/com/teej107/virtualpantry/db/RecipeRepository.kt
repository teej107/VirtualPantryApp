package com.teej107.virtualpantry.db

import org.springframework.data.repository.CrudRepository

/**
 * Created by teej107 on 1/19/2018.
 */
interface RecipeRepository : CrudRepository<Recipe, Long> {


}
