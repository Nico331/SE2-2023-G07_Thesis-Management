package it.polito.server

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ProblemDetailsHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(ProfileNotFoundException::class)
    fun handleProfileNotFound(e: ProfileNotFoundException) = ProblemDetail
        .forStatusAndDetail( HttpStatus.NOT_FOUND, e.message!! )
    @ExceptionHandler(DuplicateProfileException::class)
    fun handleDuplicateProfile(e: DuplicateProfileException) = ResponseEntity.status(HttpStatus.CONFLICT).body(ProblemDetail
        .forStatusAndDetail(HttpStatus.CONFLICT, e.message!! ))

    @ExceptionHandler(InvalidInputException::class)
    fun handleInvalidInput(e: InvalidInputException) = ProblemDetail
        .forStatusAndDetail(HttpStatus.BAD_REQUEST, e.message!! )
}

class ProfileNotFoundException: RuntimeException() {
    override val message: String?
        get() = "Profile not found"
}

class DuplicateProfileException: RuntimeException() {
    override val message: String?
        get() = "Profile is duplicate"
}

class InvalidInputException(private val msg: String?): RuntimeException() {
    override val message: String?
        get() = msg
}

class ForumNotFoundException(val forumId: String) : RuntimeException("Forum not found: $forumId")

