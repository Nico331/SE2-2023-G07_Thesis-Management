package it.polito.server.secretary

import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.archiviation_type
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class SecretaryService(private val secretaryRepository: SecretaryRepository) {

    fun createSecretary(secretary: SecretaryDTO): SecretaryDTO {
        val savedProposal = secretaryRepository.save(secretary.toDBObj())
        return savedProposal.toDTO()
    }
    fun updateSecretary(id: String, update: SecretaryDTO): SecretaryDTO? {
        val proposal = secretaryRepository.findById(id).orElse(null) ?: return null
        return secretaryRepository.save(update.toDBObj()).toDTO()
    }
    fun deleteSecretary(id: String) : ResponseEntity<Any> {
        if (!secretaryRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Secretary doesn't exists")

        secretaryRepository.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }
    fun findSecretaryById(id: String): SecretaryDTO? {
        return secretaryRepository.findById(id).map(Secretary::toDTO).orElse(null)
    }
    fun findAllSecretaries() : List<SecretaryDTO> {
        return secretaryRepository.findAll().map{(it.toDTO())}
    }
}