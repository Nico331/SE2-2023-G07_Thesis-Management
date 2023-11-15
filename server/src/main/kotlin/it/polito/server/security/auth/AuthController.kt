package it.polito.server.security.auth

import it.polito.server.student.StudentDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController(private val authService: AuthService) {

    @PostMapping("/API/login")
    @ResponseStatus(HttpStatus.OK)
    fun login(@RequestBody credentials: LoginCredentials): ResponseEntity<Any> {

        val jwt = authService.authenticate(credentials)
        return ResponseEntity.ok(jwt)
    }
}
