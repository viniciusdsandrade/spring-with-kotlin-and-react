package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity


@Entity(name = "Cube")
@DiscriminatorValue("cube")
class Cube(

    @Column(name = "side")
    private val side: Double

) : Figure() {
    override fun calculateArea(): Double {
        return 6 * side * side
    }

    override fun calculatePerimeter(): Double {
        return 12 * side
    }

    override fun calculateVolume(): Double {
        return side * side * side
    }
}
