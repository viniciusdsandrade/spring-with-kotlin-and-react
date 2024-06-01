package com.restful.geometric.figure.entity


import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "Octahedron")
@DiscriminatorValue("octahedron")
class Octahedron(

    @Column(name = "edge")
    private val edge: Double

) : Figure() {

    override fun calculateArea(): Double {
        return 2 * Math.sqrt(3.0) * edge * edge // Área do octaedro
    }

    override fun calculatePerimeter(): Double {
        return 12 * edge // Perímetro do octaedro (soma das arestas)
    }

    override fun calculateVolume(): Double {
        return (Math.sqrt(2.0) / 3.0) * edge * edge * edge // Volume do octaedro
    }
}