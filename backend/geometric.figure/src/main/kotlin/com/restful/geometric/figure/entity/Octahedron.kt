package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import jakarta.validation.constraints.Positive
import kotlin.math.sqrt

@Entity(name = "Octahedron")
@DiscriminatorValue("octahedron")
@Schema(description = "Represents an octahedron entity.")
data class Octahedron(

    @Schema(description = "The edge length of the octahedron.")
    @Positive(message = "Edge must be positive.")
    @Column(name = "edge")
    val edge: Double

) : Figure() {

    override fun calculateArea(): Double {
        val area = 2.0 * sqrt(3.0) * edge * edge
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 12.0 * edge
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = sqrt(2.0) * edge * edge * edge / 3.0
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Octahedron) return false
        if (!super.equals(other)) return false
        return edge == other.edge
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + edge.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return "Octahedron(edge=$edge)"
    }
}
