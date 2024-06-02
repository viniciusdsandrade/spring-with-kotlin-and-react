package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import kotlin.math.sqrt

@Entity(name = "Cone")
@DiscriminatorValue("cone")
@Schema(description = "Represents a cone entity.")
data class Cone(
    @Schema(description = "The radius of the cone.")
    @Column(name = "radius")
    val radius: Double,

    @Schema(description = "The height of the cone.")
    @Column(name = "height")
    val height: Double
) : Figure() {

    override fun calculateArea(): Double {
        val area = Math.PI * radius * (radius + sqrt(radius * radius + height * height))
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 2.0 * Math.PI * radius
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = Math.PI * radius * radius * height / 3.0
        return df.format(volume).toDouble()
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + radius.hashCode()
        hash *= prime + height.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Cone) return false
        if (!super.equals(other)) return false

        if (radius != other.radius) return false
        if (height != other.height) return false

        return true
    }

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(  id = $id )"
    }
}
