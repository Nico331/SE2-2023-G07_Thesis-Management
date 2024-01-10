package it.polito.server.courses

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class CourseService (private val courseRepository: CourseRepository) {
    fun createCourse(course: CourseDTO): CourseDTO {
        return courseRepository.save(course.toEntity()).toDTO()
    }

    fun getAllCourses(): List<CourseDTO> {
        return courseRepository.findAll().map { it.toDTO() }
    }

    fun findCourseById(id: String): CourseDTO? {
        return courseRepository.findById(id).map(Course::toDTO).orElse(null)
    }

    fun deleteCourse(id: String) {
        courseRepository.deleteById(id)
    }
}
