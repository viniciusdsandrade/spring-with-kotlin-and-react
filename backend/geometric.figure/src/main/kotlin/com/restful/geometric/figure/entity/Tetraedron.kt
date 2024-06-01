package com.restful.geometric.figure.entity


import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import kotlin.math.sqrt

@Entity(name = "Tetrahedron")
@DiscriminatorValue("tetrahedron")
class Tetraedron(

    @Column(name = "edge")
    private val edge: Double

) : Figure() {

    override fun calculateArea(): Double {
        return sqrt(3.0) * edge * edge  // Área do tetraedro
    }

    override fun calculatePerimeter(): Double {
        return 6 * edge // Perímetro do tetraedro
    }

    override fun calculateVolume(): Double {
        return (sqrt(2.0) / 12.0) * edge * edge * edge // Volume do tetraedro
    }
}