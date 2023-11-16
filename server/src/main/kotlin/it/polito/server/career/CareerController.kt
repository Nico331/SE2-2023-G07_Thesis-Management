package it.polito.server.career

import it.polito.server.student.Student
import it.polito.server.student.StudentDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/Career")
class CareerController (private val careerService: CareerService) {

    @PostMapping("")
    fun createCareer(@RequestBody career: Career): ResponseEntity<CareerDTO> {
        val newCareer = careerService.createCareer(career)
        return ResponseEntity(newCareer, HttpStatus.CREATED)
    }

    @GetMapping("/{id}")
    fun getCareer(@PathVariable id: String): ResponseEntity<CareerDTO> {
        val career = careerService.findCareerById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(career)
    }

    @GetMapping
    fun allCareer(): List<CareerDTO> {
        return careerService.allCareers()
    }

    @PutMapping("/{id}")
    fun updateCareer(@PathVariable id: String, @RequestBody update: CareerDTO): ResponseEntity<CareerDTO> {
        val updatedCareer = careerService.updateCareer(id, update) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedCareer)
    }

    @DeleteMapping("/{id}")
    fun deleteStudent(@PathVariable id: String): ResponseEntity<Void> {
        careerService.deleteCareer(id)
        return ResponseEntity(HttpStatus.OK)
    }
}