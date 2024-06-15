package com.restful.geometric.figure.service

data class FigureRequest(
    val type: String,
    val measurements: Map<String, Double> = emptyMap()
)