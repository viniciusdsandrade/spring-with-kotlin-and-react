package com.restful.geometric.figure.entity

import io.swagger.v3.oas.annotations.media.Schema
import jakarta.persistence.Column
import jakarta.persistence.DiscriminatorValue
import jakarta.persistence.Entity
import jakarta.validation.constraints.Positive

@Entity(name = "RectangularPrism")
@DiscriminatorValue("rectangular_prism")
@Schema(description = "Represents a rectangular prism entity.")
data class RectangularPrism(

    @Schema(description = "The length of the base of the rectangular prism.")
    @Positive(message = "Base must be positive.")
    @Column(name = "base")
    val base: Double,

    @Schema(description = "The height of the rectangular prism.")
    @Positive(message = "Height must be positive.")
    @Column(name = "height")
    val height: Double,

    @Schema(description = "The width of the rectangular prism.")
    @Positive(message = "Width must be positive.")
    @Column(name = "width")
    val width: Double

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
        val volume = base * height * width
        return df.format(volume).toDouble()
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is RectangularPrism) return false
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
        return "RectangularPrism(base=$base, height=$height, width=$width)"
    }
}
