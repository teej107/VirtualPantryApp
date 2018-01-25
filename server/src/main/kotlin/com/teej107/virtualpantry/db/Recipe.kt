package com.teej107.virtualpantry.db

import java.net.URL
import javax.persistence.*

/**
 * Created by teej107 on 1/19/2018.
 */
@Entity
class Recipe {

    @Id
    @GeneratedValue
    private var id: Long? = null

    var title: String? = null
    var description: String? = null
    var video: URL? = null
    var image: URL? = null

    @OrderColumn(name = "instruction_index")
    @ElementCollection
    var instructions: List<Instruction>? = null

    @OrderColumn(name = "ingredient_index")
    @ElementCollection
    var ingredients: List<Ingredient>? = null
}