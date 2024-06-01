package com.restful.geometric.figure.service

import com.restful.geometric.figure.entity.Figure
import org.springframework.stereotype.Service

@Service("figureService")
class FigureService : FigureServiceInterface {

    override fun calculateArea(figure: Figure): Double {
        return figure.calculateArea()
    }

    override fun calculatePerimeter(figure: Figure): Double {
        return figure.calculatePerimeter()
    }

    override fun calculateVolume(figure: Figure): Double? {
        return figure.calculateVolume()
    }
}