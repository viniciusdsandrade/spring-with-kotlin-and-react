package com.restful.geometric.figure.service

import com.restful.geometric.figure.entity.*
import org.springframework.stereotype.Service


@Service
class FigureService {

    fun createFigure(type: String, measurements: Map<String, Double>): Figure {
        return when (type) {
            "cube" -> Cube(measurements["side"] ?: throw IllegalArgumentException("Missing side measurement for cube."))
            "sphere" -> Sphere(
                measurements["radius"] ?: throw IllegalArgumentException("Missing radius measurement for sphere.")
            )

            "cylinder" -> Cylinder(
                measurements["radius"] ?: throw IllegalArgumentException("Missing radius measurement for cylinder."),
                measurements["height"] ?: throw IllegalArgumentException("Missing height measurement for cylinder.")
            )

            "cone" -> Cone(
                measurements["radius"] ?: throw IllegalArgumentException("Missing radius measurement for cone."),
                measurements["height"] ?: throw IllegalArgumentException("Missing height measurement for cone.")
            )

            "pyramid" -> Pyramid(
                measurements["base"] ?: throw IllegalArgumentException("Missing base measurement for pyramid."),
                measurements["height"] ?: throw IllegalArgumentException("Missing height measurement for pyramid.")
            )

            "rectangular_prism" -> RectangularPrism(
                measurements["base"]
                    ?: throw IllegalArgumentException("Missing base measurement for rectangular prism."),
                measurements["height"]
                    ?: throw IllegalArgumentException("Missing height measurement for rectangular prism."),
                measurements["width"]
                    ?: throw IllegalArgumentException("Missing width measurement for rectangular prism.")
            )

            "triangular_prism" -> TriangularPrism(
                measurements["base"]
                    ?: throw IllegalArgumentException("Missing base measurement for triangular prism."),
                measurements["height"]
                    ?: throw IllegalArgumentException("Missing height measurement for triangular prism."),
                measurements["width"]
                    ?: throw IllegalArgumentException("Missing width measurement for triangular prism.")
            )

            "tetrahedron" -> Tetraedron(
                measurements["edge"] ?: throw IllegalArgumentException("Missing edge measurement for tetrahedron.")
            )

            "octahedron" -> Octahedron(
                measurements["edge"] ?: throw IllegalArgumentException("Missing edge measurement for octahedron.")
            )

            else -> throw IllegalArgumentException("Tipo de figura inválido: $type")
        }
    }

    fun calculateFigure(figure: Figure): FigureResponse {
        val area = figure.calculateArea()
        val volume = figure.calculateVolume()
        val perimeter = figure.calculatePerimeter()

        return FigureResponse(area, volume, perimeter)
    }
}