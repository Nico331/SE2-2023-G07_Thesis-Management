package it.polito.server.degree

import org.springframework.data.annotation.Id

data class DegreeDTO(
    val id: String? = null,
    var codDegree: String,
    var titleDegree: String,
)