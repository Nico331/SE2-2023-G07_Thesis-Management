package it.polito.server.security.auth

import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorRepository
import it.polito.server.student.Student
import it.polito.server.student.StudentDTO
import it.polito.server.student.StudentRepository
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class AuthService(
    private val studentRepository: StudentRepository,
    private val professorRepository: ProfessorRepository
) {
    /// returns STUDENT or PROFESSOR if password is valid, INVALID if is invalid.
    /// there is no security at all, but it is just for this first sprint, we will
    /// substitute the return type with the token given by SAML2.0 service.
    fun authenticate(credentials: LoginCredentials): Any {
        val student = studentRepository.findByEmail(credentials.username)
        val professor = professorRepository.findByEmail(credentials.username)

        return when {
            student != null && student.checkPassword(credentials.password) ->
                StudentResponse(student.toDTO(), "STUDENT")

            professor != null && professor.checkPassword(credentials.password) ->
                ProfessorResponse(professor.toDTO(), "PROFESSOR")

            else -> JwtResponse("INVALID CREDENTIALS")
        }
    }
    fun getAdminToken(): String? {
        return "ADMIN"
    }

    fun registerUser(adminToken: String, user: Student): ResponseEntity<Any> {

        return ResponseEntity.ok("")
    }

}

data class LoginCredentials(
    val username: String,
    val password: String
)


data class JwtResponse(
    val jwt: String
)
data class StudentResponse(
    val user: StudentDTO,
    val jwt: String
)
data class ProfessorResponse(
    val user: ProfessorDTO,
    val jwt: String
)


data class JwtSimple(
    val jwt: String,
    val roles: String,
    val email: String,
    val preferred_username: String,
    val realm_access: RealmAccess
)
data class RealmAccess(
    val roles: List<String>
)
