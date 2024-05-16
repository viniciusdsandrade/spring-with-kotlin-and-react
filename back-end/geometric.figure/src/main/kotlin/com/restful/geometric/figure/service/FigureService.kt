package com.restful.geometric.figure.service

import com.restful.geometric.figure.entity.Figure
import org.springframework.stereotype.Service

@Service
class FigureService {

    fun calculateArea(figure: Figure): Double {
        return figure.calculateArea()
    }

    fun calculatePerimeter(figure: Figure): Double {
        return figure.calculatePerimeter()
    }

    fun calculateVolume(figure: Figure): Double? {
        return figure.calculateVolume()
    }
}