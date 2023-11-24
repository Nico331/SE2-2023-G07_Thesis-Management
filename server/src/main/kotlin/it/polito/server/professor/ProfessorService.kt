package it.polito.server.professor

import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service


@Service
class ProfessorService (private val professorRepository: ProfessorRepository) {
    fun checkPassword(professor: Professor, password: String): Boolean =
        professor.checkPassword(password)

    fun findProfessorById(id: String): ProfessorDTO? {
        return professorRepository.findById(id).map(Professor::toDTO).orElse(null)
    }
    fun allProfessors(): List<ProfessorDTO> {
        return professorRepository.findAll().map { it.toDTO() }
    }

    fun createProfessor(professor: Professor): ResponseEntity<Any> {
        //check if Professor exists
        if(professorRepository.existsProfessorByNameAndSurnameAndEmailAndCodGroupAndCodDepartment(professor.name,professor.surname,professor.email,professor.codGroup,professor.codDepartment))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("existing Professor")
        // Assumi che la password sia già impostata in professor
        val savedProfessor = professorRepository.save(professor)
        return ResponseEntity(savedProfessor, HttpStatus.CREATED)
    }

    fun updateProfessor(id: String, update: ProfessorDTO): ProfessorDTO? {
        val professor = professorRepository.findById(id).orElse(null) ?: return null

        professor.name = update.name
        professor.surname = update.surname
        professor.email = update.email

        return professorRepository.save(professor).toDTO()
    }

    fun deleteProfessor(id: String) : ResponseEntity<Any> {
        //check if Professor exists and return NOT_FOUND
        if (!professorRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this Professor does NOT EXIST")

        professorRepository.deleteById(id)
        return ResponseEntity.status(HttpStatus.OK).body("Professor with ID $id successfully deleted.")
    }

}