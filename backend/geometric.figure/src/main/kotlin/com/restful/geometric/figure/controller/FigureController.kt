package com.restful.geometric.figure.controller

import com.restful.geometric.figure.entity.Figure
import com.restful.geometric.figure.service.FigureService
import org.slf4j.Logger
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.slf4j.LoggerFactory
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema


@RestController("FigureController")
@RequestMapping("/api/v1/figures")
@Tag(name = "Figure")
class FigureController(private val figureService: FigureService) {

    val logger: Logger? = LoggerFactory.getLogger(FigureController::class.java)

    @Operation(
        summary = "Calculate perimeter, area, and volume of a geometric figure",
        description = "Calculates the perimeter, area, and volume of a geometric figure based on the provided data.",
        requestBody = io.swagger.v3.oas.annotations.parameters.RequestBody(
            content = [Content(
                mediaType = "application/json",
                schema = Schema(implementation = Figure::class)
            )]
        ),
        responses = [
            ApiResponse(responseCode = "200", description = "Calculation successful"),
            ApiResponse(responseCode = "400", description = "Bad request")
        ]
    )
    @PostMapping("/calculate")
    fun calculate(@org.springframework.web.bind.annotation.RequestBody figure: Figure?): ResponseEntity<Map<String, Double?>> {
        if (figure == null) return ResponseEntity(HttpStatus.BAD_REQUEST)

        logger?.info("Received figure: {}", figure)

        val results: MutableMap<String, Double?> = HashMap()
        results["perimeter"] = figureService.calculatePerimeter(figure)
        results["area"] = figureService.calculateArea(figure)
        results["volume"] = figureService.calculateVolume(figure)

        logger?.info("Calculation results: {}", results)

        return ResponseEntity(results, HttpStatus.OK)
    }
}
