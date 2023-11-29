package it.polito.server.security

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
        println(credentials)
        val jwt = authService.authenticate(credentials)
        println(jwt)
        return if (jwt != null) {
            ResponseEntity.ok(JwtResponse(jwt))
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }

    /*@PostMapping("/API/register")
    @ResponseStatus(HttpStatus.CREATED)
    fun registerUser(@RequestBody user: User): ResponseEntity<Any> {

        val adminToken = authService.getAdminToken() ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()

        return try {
            userService.addUser(user)
            val ret = authService.registerUser(adminToken, user)
            if(ret.body != null) {
                ResponseEntity.ok(ret.body)
            } else {
                userService.deleteUser(user.email)
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
            }
        } catch (e: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }
    }*/

    /*@PostMapping("/API/manager/register")
    @ResponseStatus(HttpStatus.CREATED)*/
}
