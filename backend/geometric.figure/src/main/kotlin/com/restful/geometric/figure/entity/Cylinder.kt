package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "Cylinder")
@DiscriminatorValue("cylinder")
@Schema(description = "Represents a cylinder entity.")
data class Cylinder(

    @Schema(description = "The radius of the cylinder.")
    @Column(name = "radius")
    val radius: Double,

    @Schema(description = "The height of the cylinder.")
    @Column(name = "height")
    val height: Double

) : Figure() {

    override fun calculateArea(): Double {
        val area = 2.0 * Math.PI * radius * (radius + height)
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 2.0 * Math.PI * radius
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = Math.PI * radius * radius * height
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Cylinder) return false
        if (!super.equals(other)) return false

        if (radius != other.radius) return false
        if (height != other.height) return false

        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + radius.hashCode()
        hash *= prime + height.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return this::class.simpleName + "(  id = $id )"
    }
}
