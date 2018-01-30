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

        fun createIngredient(name: String, measurement: Measurement, amount: Double): Ingredient {
            val ingredient = Ingredient()
            ingredient.name = "Flour"
            ingredient.measurement = measurement
            ingredient.amount = 2.0;
            return ingredientRepo.save(ingredient)
        }

        fun createInstruction(description: String): Instruction {
            val instruction = Instruction()
            instruction.description = description
            return instructionRepo.save(instruction)
        }

        fun createRecipe(title: String,
                         description: String,
                         image: URL,
                         video: URL,
                         ingredients: List<Ingredient>,
                         instructions: List<Instruction>): Recipe {
            val recipe = Recipe()
            recipe.title = title
            recipe.description = description
            recipe.image = image
            recipe.video = video
            recipe.ingredients = ingredients
            recipe.instructions = instructions
            return recipeRepo.save(recipe)
        }

        createRecipe("Flour",
                "flour flour flour flour flour flour",
                URL("https://img.thrfun.com/img/094/640/cake_flour_l2.jpg"),
                URL("https://www.youtube.com/embed/0gITBy-N6X0?rel=0"),
                listOf(createIngredient("Flour", measurement, 1.0)),
                listOf(createInstruction("Add flour")))

        createRecipe("Bubbles",
                "Not for eating unless you like soap",
                URL("https://sophosnews.files.wordpress.com/2017/05/shutterstock_296886146.jpg?w=780&h=408&crop=1"),
                URL("https://www.youtube.com/embed/s7IYR_rELyE?rel=0"),
                listOf(createIngredient("Water", measurement, 3.0),
                        createIngredient("Dish Soap", measurement, 1.0)),
                listOf(createInstruction("Mix water and soap")))

        createRecipe("Soy Sprite",
                "For the thieves!",
                URL("http://shop.efficientbazaar.com/media/catalog/product/cache/4/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/c/o/coke-300ml-pet-minipack-24bottles-1case-1.jpg"),
                URL("https://www.youtube.com/embed/queVlA4xLgI?rel=0"),
                listOf(createIngredient("Sprite", measurement, 3.0),
                        createIngredient("Soy Sauce", measurement, 3.0)),
                listOf(createInstruction("Mix ingredients until you get a color similar to Coke"),
                        createInstruction("Leave out for maximum effect")))

        createRecipe("Tide Pods",
                "A fun candy for kids to enjoy",
                URL("http://content.9news.com/photo/2014/07/29/1406674217000-tide-pod_3066689_ver1.0.jpg"),
                URL("https://www.youtube.com/embed/pM6wanZOLtk?rel=0"),
                listOf(createIngredient("Tide Pods", measurement, 10.0)),
                listOf(createInstruction("Plop in mount and chew"),
                        createInstruction("Enjoy! :D")))
    }
}