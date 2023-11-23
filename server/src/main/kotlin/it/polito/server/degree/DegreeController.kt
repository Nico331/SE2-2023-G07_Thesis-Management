package it.polito.server.degree

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/Degree")
class DegreeController (private val degreeService: DegreeService) {

    @PostMapping("")
    fun createDegree(@RequestBody degree: Degree): ResponseEntity<DegreeDTO> {
        val newDegree = degreeService.createDegree(degree)
        return ResponseEntity(newDegree, HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getDegree(@PathVariable id: String): ResponseEntity<DegreeDTO> {
        val degree = degreeService.findDegreeById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(degree)
    }

    @GetMapping
    fun allDegree(): List<DegreeDTO> {
        return degreeService.allDegrees()
    }

    @PutMapping("/{id}")
    fun updateDegree(@PathVariable id: String, @RequestBody update: DegreeDTO): ResponseEntity<DegreeDTO> {
        val updatedDegree = degreeService.updateDegree(id, update) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedDegree)
    }

    @DeleteMapping("/{id}")
    fun deleteDegree(@PathVariable id: String): ResponseEntity<Any> {
        return degreeService.deleteDegree(id)
    }
}