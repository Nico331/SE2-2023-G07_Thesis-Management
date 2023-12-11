package it.polito.server.secretary

import it.polito.server.requestproposal.RequestProposalDTO
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/API/secretaries")
class SecretaryController(private val secretaryService: SecretaryService) {

    @PostMapping("")
    fun createSecretary(@RequestBody secretary: SecretaryDTO): ResponseEntity<Any> {
        val newSecretary = secretaryService.createSecretary(secretary)
        return ResponseEntity(newSecretary, HttpStatus.CREATED)
    }

    @PutMapping("/{id}")
    fun updateSecretary (@PathVariable id : String , @RequestBody update : SecretaryDTO) : ResponseEntity<SecretaryDTO> {
        val updatedSecretary = secretaryService.updateSecretary(id, update ) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedSecretary)
    }

    @DeleteMapping("/{id}")
    fun deleteSecretary(@PathVariable id: String):ResponseEntity<Any>{
        return secretaryService.deleteSecretary(id)
    }

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