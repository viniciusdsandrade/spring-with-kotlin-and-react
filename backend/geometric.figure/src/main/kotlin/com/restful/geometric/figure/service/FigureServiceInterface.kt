package com.restful.geometric.figure.service

import com.restful.geometric.figure.entity.Figure
import org.springframework.stereotype.Component
import io.swagger.v3.oas.annotations.tags.Tag

@Component("figureServiceInterface")
@Tag(name = "Figure Service Interface", description = "Interface for operations related to geometric figures")
interface FigureServiceInterface {

    fun calculateArea(figure: Figure): Double
    fun calculatePerimeter(figure: Figure): Double
    fun calculateVolume(figure: Figure): Double?
}
