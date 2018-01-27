package com.teej107.virtualpantry.db

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.net.URL

/**
 * Created by teej107 on 1/19/2018.
 */
@Component
class DatabaseLoader
@Autowired constructor(private val recipeRepo: RecipeRepository,
                       private val measurementRepo: MeasurementRepository,
                       private val ingredientRepo: IngredientRepository,
                       private val instructionRepo: InstructionRepository) : CommandLineRunner {

    override fun run(vararg args: String?) {
        measurementRepo.save(Measurement("Milliliter", "mL", 1.0))
        measurementRepo.save(Measurement("Teaspoon", "tsp", 0.202884))
        val measurement = measurementRepo.save(Measurement("Cup", "cup", 0.00416667))

        val ingredient = Ingredient()
        ingredient.name = "Flour"
        ingredient.measurement = measurement
        ingredient.amount = 2.0;
        ingredientRepo.save(ingredient)

        val ingredient2 = Ingredient()
        ingredient2.name = "Sugar"
        ingredient2.measurement = measurement
        ingredient2.amount = 1.0
        ingredientRepo.save(ingredient2)

        val instruction = Instruction()
        instruction.description = "Mix sugar and flour"
        instructionRepo.save(instruction)

        val instruction2 = Instruction()
        instruction2.description = "I don't know I'm just doing a test"
        instructionRepo.save(instruction2)

        val recipe = Recipe()
        recipe.title = "Testing 123"
        recipe.description = "Just a test recipe. Nothing special."
        recipe.image = URL("https://img.thrfun.com/img/094/640/cake_flour_l2.jpg")
        recipe.video = URL("https://www.youtube.com/embed/0gITBy-N6X0?rel=0")
        recipe.ingredients = listOf(ingredient, ingredient2)
        recipe.instructions = listOf(instruction, instruction2)
        recipeRepo.save(recipe)
    }
}