package com.restful.geometric.figure.entity

import com.fasterxml.jackson.annotation.JsonSubTypes
import com.fasterxml.jackson.annotation.JsonTypeInfo
import jakarta.persistence.*

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
    JsonSubTypes.Type(value = Piramid::class, name = "piramid"),
    JsonSubTypes.Type(value = RectangularPrism::class, name = "rectangular_prism"),
    JsonSubTypes.Type(value = TriangularPrism::class, name = "triangular_prism"),
    JsonSubTypes.Type(value = Tetraedron::class, name = "tetraedron"),
    JsonSubTypes.Type(value = Octahedron::class, name = "octaedro")
)
@Table(name = "tb_figure")
@Entity(name = "Figure")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
abstract class Figure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open var id: Long? = null

    abstract fun calculateArea(): Double
    abstract fun calculatePerimeter(): Double
    abstract fun calculateVolume(): Double?
}




