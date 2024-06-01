package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "Cylinder")
@DiscriminatorValue("cylinder")
class Cylinder(

    @Column(name = "radius")
    private val radius: Double,

    @Column(name = "height")
    private val height: Double

) : Figure() {
    override fun calculateArea(): Double {
        return 2 * Math.PI * radius * (radius + height)
    }

    override fun calculatePerimeter(): Double {
        return 2 * Math.PI * radius
    }

    override fun calculateVolume(): Double {
        return Math.PI * radius * radius * height
    }
}