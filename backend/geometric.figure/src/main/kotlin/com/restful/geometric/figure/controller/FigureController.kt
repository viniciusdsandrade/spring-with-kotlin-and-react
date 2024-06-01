package com.restful.geometric.figure.controller


import com.restful.geometric.figure.entity.Figure
import com.restful.geometric.figure.service.FigureService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/v1/figures")
class FigureController(private val figureService: FigureService) {
    @PostMapping("/calculate")
    fun calculate(@RequestBody figure: Figure?): ResponseEntity<Map<String, Double?>> {
        val results: MutableMap<String, Double?> = HashMap()
        results["area"] = figureService.calculateArea(figure!!)
        results["perimeter"] = figureService.calculatePerimeter(figure)
        results["volume"] = figureService.calculateVolume(figure)

        return ResponseEntity(results, HttpStatus.OK)
    }
}