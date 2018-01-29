package com.teej107.virtualpantry.web

import com.teej107.virtualpantry.db.Recipe
import com.teej107.virtualpantry.db.RecipeRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.hateoas.EntityLinks
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Created by teej107 on 1/27/2018.
 */
@Controller
@RequestMapping("/api/recipelist")
class RecipeListController {

    @Autowired
    val recipeRepository: RecipeRepository? = null

    @Autowired
    val entityLinks: EntityLinks? = null

    @GetMapping
    @ResponseBody
    fun sendRecipeList(): List<RecipeView> {
        val data = mutableListOf<RecipeView>()
        recipeRepository!!.findAll().forEach {
            val link = entityLinks!!.linkToSingleResource(Recipe::class.java, it.id)
            data.add(RecipeView(it, link.href))
        }
        return data
    }
}
