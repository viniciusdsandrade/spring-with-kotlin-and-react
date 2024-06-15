package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import jakarta.validation.constraints.Positive

@Entity(name = "Cube")
@DiscriminatorValue("cube")
@Schema(description = "Represents a cube entity.")
data class Cube(

    @Schema(description = "The length of one side of the cube.")
    @Positive(message = "Side must be positive.")
    @Column(name = "side")
    val side: Double

) : Figure() {

    override fun calculateArea(): Double {
        val area = 6.0 * side * side
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 12.0 * side
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = side * side * side
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Cube) return false
        if (!super.equals(other)) return false

        if (side != other.side) return false

        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + side.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return "Cube(side=$side)"
    }
}
