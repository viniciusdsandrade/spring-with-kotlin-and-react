package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import kotlin.math.sqrt

@Entity(name = "Cone")
@DiscriminatorValue("cone")
class Cone(
    @Column(name = "radius")
    private val radius: Double,

    @Column(name = "height")
    private val height: Double
) : Figure() {
    override fun calculateArea(): Double {
        val slantHeight = sqrt(radius * radius + height * height)
        return Math.PI * radius * (radius + slantHeight)
    }

    override fun calculatePerimeter(): Double {
        return 2 * Math.PI * radius // Apenas a circunferência da base
    }

    override fun calculateVolume(): Double {
        return (1.0 / 3.0) * Math.PI * radius * radius * height
    }
}