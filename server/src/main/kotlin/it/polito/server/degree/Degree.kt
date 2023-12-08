package it.polito.server.degree

import it.polito.server.annotations.CoderseeGenerated
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
@CoderseeGenerated
@Document
data class Degree(
    @Id val id: String? = null,
    var codDegree: String,
    var titleDegree: String,
) {

    fun toDTO(): DegreeDTO = DegreeDTO(
        id = this.id,
        codDegree= this.codDegree,
        titleDegree = this.titleDegree,
    )
}

