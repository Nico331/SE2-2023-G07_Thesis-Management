package it.polito.server.courses

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/courses")
class CourseController (private val courseService: CourseService) {

    @PostMapping("")
    fun createCourse(@RequestBody course: CourseDTO): ResponseEntity<CourseDTO> {
        val newCourse = courseService.createCourse(course)
        return ResponseEntity(newCourse, HttpStatus.CREATED)
    }

    @GetMapping("")
    fun getAllCourses(): ResponseEntity<List<CourseDTO>> {
        val body = courseService.getAllCourses()
        val code = if (body.isEmpty()) HttpStatus.NOT_FOUND else HttpStatus.OK
        return ResponseEntity(body, code)
    }

    @GetMapping("/{id}")
    fun getCourse(@PathVariable id: String): ResponseEntity<CourseDTO> {
        val course = courseService.findCourseById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(course)
    }

    @DeleteMapping("/{id}")
    fun deleteCourse(@PathVariable id: String): ResponseEntity<Any> {
        //check if course exists and return NOT_FOUND
        if (courseService.findCourseById(id) == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this course does NOT EXIST")

        courseService.deleteCourse(id)
        return ResponseEntity.status(HttpStatus.OK).body("course with ID $id successfully deleted.")
    }
}