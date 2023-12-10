package it.polito.server.secretary

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class SecretaryService(private val secretaryRepository: SecretaryRepository) {

}