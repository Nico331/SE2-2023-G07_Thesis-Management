package it.polito.server.professor;

import it.polito.server.forum.ForumUser
import it.polito.server.forum.ForumUserInterface
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Professor (
    @Id override val id: String? = null,
    override var name: String,
    override var surname: String,
    var email : String,
    val codGroup : String,
    val codDepartment : String,
    //private var passwordHash: String? = null

): ForumUserInterface {
    /*fun setPassword(password: String) {
        this.passwordHash = BCryptPasswordEncoder().encode(password)
    }

    fun checkPassword(password: String): Boolean {
        return BCryptPasswordEncoder().matches(password, this.passwordHash)
    }*/

    fun toDTO () : ProfessorDTO = ProfessorDTO(
        id = this.id,
        name = this.name,
        surname = this.surname,
        email = this.email,
        codGroup = this.codGroup,
        codDepartment = this.codDepartment
    )
}
