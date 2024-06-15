package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import jakarta.validation.constraints.Positive

@Entity(name = "TriangularPrism")
@DiscriminatorValue("triangular_prism")
@Schema(description = "Represents a triangular prism entity.")
data class TriangularPrism(

    @Schema(description = "The length of the base of the triangular prism.")
    @Positive(message = "Base must be positive.")
    @Column(name = "base")
    private val base: Double,

    @Schema(description = "The height of the triangular prism.")
    @Positive(message = "Height must be positive.")
    @Column(name = "height")
    private val height: Double,

    @Schema(description = "The width of the triangular prism.")
    @Positive(message = "Width must be positive.")
    @Column(name = "width")
    private val width: Double

) : Figure() {

    override fun calculateArea(): Double {
        val area = 2.0 * (base * height + base * width + height * width)
        return df.format(area).toDouble()
    }

    override fun calculatePerimeter(): Double {
        val perimeter = 4.0 * (base + height + width)
        return df.format(perimeter).toDouble()
    }

    override fun calculateVolume(): Double {
        val volume = base * height * width / 2.0
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is TriangularPrism) return false
        if (!super.equals(other)) return false

        if (base != other.base) return false
        if (height != other.height) return false
        if (width != other.width) return false

        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = super.hashCode()

        hash *= prime + base.hashCode()
        hash *= prime + height.hashCode()
        hash *= prime + width.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return "TriangularPrism(base=$base, height=$height, width=$width)"
    }
}
