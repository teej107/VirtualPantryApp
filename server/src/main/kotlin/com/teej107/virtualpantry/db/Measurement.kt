package com.teej107.virtualpantry.db

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

/**
 * Milliliter (mL) is base.
 */
@Entity
data class Measurement(@Column(unique = true)
                       var name: String?,
                       var abbreviation: String?,
                       var conversionRatio: Double?) {

    @Id
    @GeneratedValue
    private var id: Long? = null

    protected constructor() : this(null, null, null)

    fun convert(measure: Measurement): Double = measure.conversionRatio!! * conversionRatio!!
}
