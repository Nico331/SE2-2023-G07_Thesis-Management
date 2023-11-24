package it.polito.server.degree

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class DegreeService (private val degreeRepository: DegreeRepository) {

    fun createDegree(degree: Degree): DegreeDTO {
        val savedDegree = degreeRepository.save(degree)
        return savedDegree.toDTO()
    }

    fun findDegreeById(id: String): DegreeDTO? {
        return degreeRepository.findById(id).map(Degree::toDTO).orElse(null)
    }

    fun allDegrees(): List<DegreeDTO> {
        return degreeRepository.findAll().map { it.toDTO() }
    }

    fun updateDegree(id: String, update: DegreeDTO): DegreeDTO? {
        val degree = degreeRepository.findById(id).orElse(null) ?: return null

        degree.codDegree = update.codDegree
        degree.titleDegree = update.titleDegree

        return degreeRepository.save(degree).toDTO()
    }

    fun deleteDegree(id: String) : ResponseEntity<Any> {
        //check if Degree exists and return NOT_FOUND
        if (!degreeRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this Degree does NOT EXIST")

        degreeRepository.deleteById(id)
        return ResponseEntity.status(HttpStatus.OK).body("Degree with ID $id successfully deleted.")
    }

}
