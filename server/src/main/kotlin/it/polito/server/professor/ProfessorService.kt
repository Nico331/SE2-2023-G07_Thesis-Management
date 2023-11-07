package it.polito.server.professor

import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorRepository
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

    fun createProfessor(professor: Professor): ProfessorDTO {
        // Assumi che la password sia già impostata in professor
        val savedProfessor = professorRepository.save(professor)
        return savedProfessor.toDTO()
    }

    fun updateProfessor(id: String, update: ProfessorDTO): ProfessorDTO? {
        val professor = professorRepository.findById(id).orElse(null) ?: return null

        professor.name = update.name
        professor.surname = update.surname
        professor.email = update.email

        return professorRepository.save(professor).toDTO()
    }

    fun deleteProfessor(id: String) {
        professorRepository.deleteById(id)
    }

}