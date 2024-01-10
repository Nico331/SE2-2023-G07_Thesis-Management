package it.polito.server.secretary

import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/API/secretaries")
class SecretaryController(private val secretaryService: SecretaryService) {

    @GetMapping("/{id}")
    fun getSecretary(@PathVariable id: String): ResponseEntity<SecretaryDTO>{
        val secretary = secretaryService.findSecretaryById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(secretary)
    }

    @GetMapping("")
    fun getAllSecretary(): ResponseEntity<List<SecretaryDTO>>{
        val secretaries = secretaryService.findAllSecretaries()
        return ResponseEntity.ok(secretaries)
    }

}
