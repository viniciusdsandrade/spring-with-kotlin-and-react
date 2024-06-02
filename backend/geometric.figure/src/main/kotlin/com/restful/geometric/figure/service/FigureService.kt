package com.restful.geometric.figure.service

import com.restful.geometric.figure.entity.Figure
import org.springframework.stereotype.Service


import com.restful.geometric.figure.entity.Cube
import com.restful.geometric.figure.entity.Sphere
import com.restful.geometric.figure.entity.Cylinder
import com.restful.geometric.figure.entity.Cone
import com.restful.geometric.figure.entity.Piramid
import com.restful.geometric.figure.entity.RectangularPrism
import com.restful.geometric.figure.entity.TriangularPrism
import com.restful.geometric.figure.entity.Tetraedron
import com.restful.geometric.figure.entity.Octahedron


@Service
class FigureService {

    fun createFigure(type: String, measurements: Map<String, Double>): Figure {
        return when (type) {
            "cube" -> Cube(measurements["side"]!!)
            "sphere" -> Sphere(measurements["radius"]!!)
            "cylinder" -> Cylinder(measurements["radius"]!!, measurements["height"]!!)
            "cone" -> Cone(measurements["radius"]!!, measurements["height"]!!)
            "pyramid" -> Piramid(measurements["base"]!!, measurements["height"]!!)
            "rectangular_prism" -> RectangularPrism(
                measurements["base"]!!,
                measurements["height"]!!,
                measurements["width"]!!
            )

            "triangular_prism" -> TriangularPrism(
                measurements["base"]!!,
                measurements["height"]!!,
                measurements["width"]!!
            )

            "tetrahedron" -> Tetraedron(measurements["edge"]!!)
            "octahedron" -> Octahedron(measurements["edge"]!!)
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