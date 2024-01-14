package it.polito.server.courses

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Course (
    @Id val id: String? = null,
    var name: String,
    var code: String
){
    fun toDTO(): CourseDTO = CourseDTO(
        id = this.id,
        name = this.name,
        code = this.code
    )
}
