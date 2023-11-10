package it.polito.server.professor;

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@Document
data class Professor (
    @Id val id: String? = null,
    var name : String,
    var surname : String,
    var email : String,
    val codGroup : String,
    val codDepartment : String,
    private var passwordHash: String? = null

) {
    fun setPassword(password: String) {
        this.passwordHash = BCryptPasswordEncoder().encode(password)
    }

    fun checkPassword(password: String): Boolean {
        return BCryptPasswordEncoder().matches(password, this.passwordHash)
    }

    fun toDTO () : ProfessorDTO = ProfessorDTO(
        id = this.id,
        name = this.name,
        surname = this.surname,
        email = this.email,
        codGroup = this.codGroup,
        codDepartment = this.codDepartment
    )
}
