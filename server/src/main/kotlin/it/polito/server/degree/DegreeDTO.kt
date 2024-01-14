package it.polito.server.degree

import it.polito.server.annotations.CoderseeGenerated

@CoderseeGenerated
data class DegreeDTO(
    val id: String? = null,
    var codDegree: String,
    var titleDegree: String,
)
