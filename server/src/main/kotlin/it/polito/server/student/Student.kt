package it.polito.server.student

import it.polito.server.forum.ForumUserInterface
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Student(
    @Id override val id: String? = null,
    override var name: String,
    override var surname: String,
    var gender: String,
    var nationality: String,
    var email: String,
    var codDegree: String,
    var enrollmentYear: Int,
) : ForumUserInterface {
    fun toDTO(): StudentDTO = StudentDTO(
        id = this.id,
        surname = this.surname,
        name = this.name,
        gender = this.gender,
        nationality = this.nationality,
        email = this.email,
        codDegree = this.codDegree,
        enrollmentYear = this.enrollmentYear
        // No password in DTO
    )
}

