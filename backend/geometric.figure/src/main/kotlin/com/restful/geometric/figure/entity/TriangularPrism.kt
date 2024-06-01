package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "TriangularPrism")
@DiscriminatorValue("triangular_prism")
class TriangularPrism(

    @Column(name = "base")
    private val base: Double,

    @Column(name = "height")
    private val height: Double,

    @Column(name = "width")
    private val width: Double

) : Figure(
) {

    override fun calculateArea(): Double {
        return 2 * (base * height + base * width + height * width)
    }

    override fun calculatePerimeter(): Double {
        return 4 * (base + height + width)
    }

    override fun calculateVolume(): Double {
        return base * height * width / 2
    }

}
