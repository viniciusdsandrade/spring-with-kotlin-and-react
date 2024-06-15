package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import jakarta.validation.constraints.Positive

@Entity(name = "Sphere")
@DiscriminatorValue("sphere")
@Schema(description = "Represents a sphere entity.")
data class Sphere(

    @Schema(description = "The radius of the sphere.")
    @Positive(message = "Radius must be positive.")
    @Column(name = "radius")
    val radius: Double

) : Figure() {

    override fun calculateArea(): Double {
        val area = 4.0 * Math.PI * radius * radius
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 2.0 * Math.PI * radius
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = (4.0 / 3.0) * Math.PI * radius * radius * radius
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Sphere) return false
        if (!super.equals(other)) return false

        if (radius != other.radius) return false

        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + radius.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return "Sphere(radius=$radius)"
    }
}
