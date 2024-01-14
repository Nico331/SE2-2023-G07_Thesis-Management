package it.polito.server.professor

import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/API/professors")
class ProfessorController(private val professorService: ProfessorService) {

    @GetMapping("/{id}")
    fun getProfessor(@PathVariable id: String): ResponseEntity<ProfessorDTO> {
        val professor = professorService.findProfessorById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(professor)
    }
    @GetMapping
    fun allProfessors(): List<ProfessorDTO> {
        return professorService.allProfessors()
    }

    @PostMapping("")
    fun createProfessor(@RequestBody professor: Professor): ResponseEntity<Any> {
        return professorService.createProfessor(professor)
    }

    @PutMapping("/{id}")
    fun updateProfessor(@PathVariable id: String, @RequestBody update: ProfessorDTO): ResponseEntity<ProfessorDTO> {
        val updatedProfessor = professorService.updateProfessor(id, update) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedProfessor)
    }

    @DeleteMapping("/{id}")
    fun deleteProfessor(@PathVariable id: String): ResponseEntity<Any> {
        return professorService.deleteProfessor(id)
    }
}
