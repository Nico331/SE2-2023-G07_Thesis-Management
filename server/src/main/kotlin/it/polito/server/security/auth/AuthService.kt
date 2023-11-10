package it.polito.server.security.auth

import it.polito.server.professor.ProfessorRepository
import it.polito.server.student.Student
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
    fun authenticate(credentials: LoginCredentials): String? {
        return if (studentRepository.findByEmail(credentials.username) != null) {
            if (studentRepository.findByEmail(credentials.username)!!.checkPassword(credentials.password))
                "STUDENT"
            else{
                "INVALID PASSWORD"
            }
        } else if (professorRepository.findByEmail(credentials.username) != null) {
            if (professorRepository.findByEmail(credentials.username)!!.checkPassword(credentials.password))
                "PROFESSOR"
            else "INVALID PASSWORD"
        } else "INVALID USERNAME"
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
