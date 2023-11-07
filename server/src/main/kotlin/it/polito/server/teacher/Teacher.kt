package it.polito.server.teacher;

import it.polito.server.student.StudentDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Date

@Document
data class Teacher (
    @Id val id: String? = null,
    val name : String,
    val surname : String,
    val email : String,
    val codGroup : String,
    val codDepartment : String
) {

    fun toDTO () : TeacherDTO = TeacherDTO(
        id = this.id,
        name = this.name,
        surname = this.surname,
        email = this.email,
        codGroup = this.codGroup,
        codDepartment = this.codDepartment
    )
}
