package com.restful.geometric.figure.entity

import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "Piramid")
@DiscriminatorValue("piramid")
class Piramid(

    @Column(name = "base")
    private val base: Double

) : Figure() {

    override fun calculateArea(): Double {
        return base * base
    }

    override fun calculatePerimeter(): Double {
        return 4 * base
    }

    override fun calculateVolume(): Double {
        return base * base * base / 3
    }
}
