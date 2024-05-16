package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "Circle")
@DiscriminatorValue("circle")
class Circle(
    @Column(name = "radius")
    private val radius: Double
) : Figure() {
    override fun calculateArea(): Double {
        return Math.PI * radius * radius
    }

    override fun calculatePerimeter(): Double {
        return 2 * Math.PI * radius
    }

    override fun calculateVolume(): Double? {
        return null // Círculo é uma figura 2D
    }
}