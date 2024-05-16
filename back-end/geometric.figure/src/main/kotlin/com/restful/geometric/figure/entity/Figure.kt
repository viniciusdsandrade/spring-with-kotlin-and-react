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
    JsonSubTypes.Type(value = Circle::class, name = "Circle"),
    JsonSubTypes.Type(value = Cone::class, name = "Cone"),
    JsonSubTypes.Type(value = Hexagon::class, name = "Hexagon")
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




