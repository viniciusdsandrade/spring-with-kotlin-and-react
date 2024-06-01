package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity


@Entity(name = "Sphere")
@DiscriminatorValue("sphere")
class Sphere(

    @Column(name = "radius")
    private val radius: Double

) : Figure() {

    override fun calculateArea(): Double {
        return 4 * Math.PI * radius * radius
    }

    override fun calculatePerimeter(): Double {
        return 2 * Math.PI * radius
    }

    override fun calculateVolume(): Double {
        return 4.0 / 3.0 * Math.PI * radius * radius * radius
    }

}
