package com.restful.geometric.figure.controller

import com.restful.geometric.figure.service.FigureRequest
import com.restful.geometric.figure.service.FigureResponse
import com.restful.geometric.figure.service.FigureService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.tags.Tag
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import jakarta.validation.Valid

@RestController("FigureController")
@RequestMapping("/api/v1/figures")
@Tag(name = "Figure")
class FigureController(private val figureService: FigureService) {

    private val logger: Logger = LoggerFactory.getLogger(FigureController::class.java)

    @Operation(
        summary = "Calculate perimeter, area, and volume of a geometric figure",
        description = "Calculates the perimeter, area, and volume of a geometric figure based on the provided data.",
        requestBody = io.swagger.v3.oas.annotations.parameters.RequestBody(
            content = [Content(
                mediaType = "application/json",
                schema = Schema(implementation = FigureRequest::class)
            )]
        ),
        responses = [
            ApiResponse(
                responseCode = "200",
                description = "Calculation successful",
                content = [Content(schema = Schema(implementation = FigureResponse::class))]
            ),
            ApiResponse(responseCode = "400", description = "Bad request")
        ]
    )
    @PostMapping("/calculate")
    fun calculate(@Valid @RequestBody figureRequest: FigureRequest): ResponseEntity<FigureResponse> {
        logger.info("Received figure request: {}", figureRequest)

        val figure = figureService.createFigure(figureRequest.type, figureRequest.measurements)
        val results = figureService.calculateFigure(figure)

        logger.info("Calculation results: {}", results)

        return ResponseEntity(results, HttpStatus.OK)
    }
}