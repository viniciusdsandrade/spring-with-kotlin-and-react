package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import kotlin.math.sqrt

@Entity(name = "Hexagon")
@DiscriminatorValue("hexagon")
class Hexagon(
    @Column(name = "side")
    private val side: Double
) : Figure() {
    override fun calculateArea(): Double {
        return (3 * sqrt(3.0) * side * side) / 2
    }

    override fun calculatePerimeter(): Double {
        return 6 * side
    }

    override fun calculateVolume(): Double? {
        return null // Hexágono é uma figura 2D
    }
}