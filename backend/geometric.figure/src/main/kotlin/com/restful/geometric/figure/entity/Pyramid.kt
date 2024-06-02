package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity

@Entity(name = "Piramid")
@DiscriminatorValue("piramid")
@Schema(description = "Represents a pyramid entity.")
data class Pyramid(

    @Schema(description = "The length of the base of the pyramid.")
    @Column(name = "base")
    val base: Double,

    @Schema(description = "The height of the pyramid.")
    @Column(name = "height")
    val height: Double

) : Figure() {

    override fun calculateArea(): Double {
        val perimeter = 4.0 * base
        val area = 0.5 * base * perimeter + base
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 4.0 * base
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = (1.0 / 3.0) * base * base * height
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Pyramid) return false
        if (!super.equals(other)) return false

        if (base != other.base) return false
        if (height != other.height) return false

        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + base.hashCode()
        hash *= prime + height.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return "${this::class.simpleName}(id = $id)"
    }
}
