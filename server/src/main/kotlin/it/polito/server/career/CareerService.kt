package it.polito.server.career

import it.polito.server.student.Student
import it.polito.server.student.StudentDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable

@Service
class CareerService (private val careerRepository: CareerRepository) {

    fun createCareer(career: Career): CareerDTO {
        val savedCareer = careerRepository.save(career)
        return savedCareer.toDTO()
    }

    fun findCareerById(id: String): CareerDTO? {
        return careerRepository.findById(id).map(Career::toDTO).orElse(null)
    }

    fun allCareers(): List<CareerDTO> {
        return careerRepository.findAll().map { it.toDTO() }
    }

    fun updateCareer(id: String, update: CareerDTO): CareerDTO? {
        val career = careerRepository.findById(id).orElse(null) ?: return null

        career.studentId = update.studentId
        career.codCourse = update.codCourse
        career.titleCourse = update.titleCourse
        career.cfu = update.cfu
        career.grade = update.grade
        career.date = update.date


        return careerRepository.save(career).toDTO()
    }

    fun deleteCareer(id: String) : ResponseEntity<Any> {
        //check if Career exists and return NOT_FOUND
        if (!careerRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this Career does NOT EXIST")

        careerRepository.deleteById(id)
        return ResponseEntity.status(HttpStatus.OK).body("Career with ID $id successfully deleted.")
    }

}
