package it.polito.server.secretary

import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/API/secretaries")
class SecretaryController(private val secretaryService: SecretaryService) {

}