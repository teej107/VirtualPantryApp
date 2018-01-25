package com.teej107.virtualpantry.db

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

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
    }
}