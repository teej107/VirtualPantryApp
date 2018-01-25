package com.teej107.virtualpantry.db

import javax.persistence.*

/**
 * Created by teej107 on 1/19/2018.
 */
@Entity
class Ingredient {

    @Id
    @GeneratedValue
    private var id: Long? = null

    var name: String? = null

    @ManyToOne
    @JoinColumn(name = "measurement")
    var measurement: Measurement? = null

    var amount: Double? = null
}