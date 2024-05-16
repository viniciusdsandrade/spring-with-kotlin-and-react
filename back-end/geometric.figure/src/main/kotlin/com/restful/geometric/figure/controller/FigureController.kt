package com.restful.geometric.figure.controller

import com.restful.geometric.figure.entity.Figure
import com.restful.geometric.figure.service.FigureService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/figures")
class FigureController(private val figureService: FigureService) {

    @PostMapping("/calculate")
    fun calculate(@RequestBody figure: Figure): Map<String, Any?> {
        return mapOf(
            "area" to figureService.calculateArea(figure),
            "perimeter" to figureService.calculatePerimeter(figure),
            "volume" to figureService.calculateVolume(figure)
        )
    }
}