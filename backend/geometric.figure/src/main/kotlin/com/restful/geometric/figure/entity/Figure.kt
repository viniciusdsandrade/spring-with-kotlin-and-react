package com.restful.geometric.figure.entity

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import jakarta.persistence.*
import java.text.DecimalFormat
import io.swagger.v3.oas.annotations.media.Schema

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    include = JsonTypeInfo.As.PROPERTY,
    property = "type"
)
@JsonSubTypes(
    JsonSubTypes.Type(value = Cube::class, name = "cube"),
    JsonSubTypes.Type(value = Sphere::class, name = "sphere"),
    JsonSubTypes.Type(value = Cylinder::class, name = "cylinder"),
    JsonSubTypes.Type(value = Cone::class, name = "cone"),
    JsonSubTypes.Type(value = Pyramid::class, name = "piramid"),
    JsonSubTypes.Type(value = RectangularPrism::class, name = "rectangular_prism"),
    JsonSubTypes.Type(value = TriangularPrism::class, name = "triangular_prism"),
    JsonSubTypes.Type(value = Tetraedron::class, name = "tetrahedron"),
    JsonSubTypes.Type(value = Octahedron::class, name = "octahedron")
)
@Table(
    name = "tb_figure",
    schema = "db_geometric_figure"
)
@Entity(name = "Figure")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@Schema(description = "Abstract class representing a geometric figure.")
abstract class Figure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier for the figure.", readOnly = true)
    open var id: Long? = null

    companion object {
        val df = DecimalFormatWrapper("#.####").decimalFormat
    }

    @Schema(description = "Calculates the area of the figure.")
    abstract fun calculateArea(): Double

    @Schema(description = "Calculates the perimeter of the figure.")
    abstract fun calculatePerimeter(): Double

    @Schema(description = "Calculates the volume of the figure.")
    abstract fun calculateVolume(): Double?

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Figure) return false

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        val prime = 31
        var hash = 1

        hash *= prime + id.hashCode()

        if (hash < 0) hash *= -1

        return hash
    }

    override fun toString(): String {
        return this::class.simpleName + "(  id = $id )"
    }
}

class DecimalFormatWrapper(pattern: String) {
    val decimalFormat = DecimalFormat(pattern)
}
