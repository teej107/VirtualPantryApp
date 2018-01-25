package com.teej107.virtualpantry.db

import java.net.URL
import javax.persistence.*

/**
 * Created by teej107 on 1/21/2018.
 */
@Entity
class Instruction {

    @Id
    @GeneratedValue
    var id: Long? = null

    var description: String? = null

    @OrderColumn(name = "instruction_image_index")
    @ElementCollection
    var images: List<URL>? = null
}