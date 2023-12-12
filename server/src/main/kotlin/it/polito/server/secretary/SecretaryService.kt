package it.polito.server.secretary

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class SecretaryService(private val secretaryRepository: SecretaryRepository) {

    fun createSecretary(secretary: Secretary): ResponseEntity<Any> {
        if(secretaryRepository.existsSecretaryByNameAndSurnameAndEmail(secretary.name,secretary.surname,secretary.email))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("existing Secretary")

        val savedSecretary = secretaryRepository.save(secretary)
        return ResponseEntity(savedSecretary, HttpStatus.CREATED)
    }
    fun updateSecretary(id: String, update: SecretaryDTO): SecretaryDTO? {
        val proposal = secretaryRepository.findById(id).orElse(null) ?: return null

        proposal.name = update.name
        proposal.surname = update.surname
        proposal.email = update.email

        return secretaryRepository.save(proposal).toDTO()
    }
    fun deleteSecretary(id: String) : ResponseEntity<Any> {
        if (!secretaryRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Secretary doesn't exists")

        secretaryRepository.deleteById(id)
        return ResponseEntity.status(HttpStatus.OK).body("Secretary with ID $id successfully deleted.")
    }
    fun findSecretaryById(id: String): SecretaryDTO? {
        return secretaryRepository.findById(id).map(Secretary::toDTO).orElse(null)
    }
    fun findAllSecretaries() : List<SecretaryDTO> {
        return secretaryRepository.findAll().map{(it.toDTO())}
    }
}