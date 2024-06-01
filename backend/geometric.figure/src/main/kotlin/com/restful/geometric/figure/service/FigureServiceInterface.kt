package com.restful.geometric.figure.service

import com.restful.geometric.figure.entity.Figure
import org.springframework.stereotype.Component

@Component("figureServiceInterface")
interface FigureServiceInterface {

    fun calculateArea(figure: Figure): Double
    fun calculatePerimeter(figure: Figure): Double
    fun calculateVolume(figure: Figure): Double?
}