package it.polito.server.secretary

import org.springframework.stereotype.Service

@Service
class SecretaryService(private val secretaryRepository: SecretaryRepository) {

    fun findSecretaryById(id: String): SecretaryDTO? {
        return secretaryRepository.findById(id).map(Secretary::toDTO).orElse(null)
    }
    fun findAllSecretaries() : List<SecretaryDTO> {
        return secretaryRepository.findAll().map{(it.toDTO())}
    }
}