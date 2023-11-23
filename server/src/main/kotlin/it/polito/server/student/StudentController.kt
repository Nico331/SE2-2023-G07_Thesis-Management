package it.polito.server.student

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/students")
class StudentController(private val studentService: StudentService) {

    @GetMapping("/{id}")
    fun getStudent(@PathVariable id: String): ResponseEntity<StudentDTO> {
        val student = studentService.findStudentById(id) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(student)
    }
    @GetMapping
    fun allStudents(): List<StudentDTO> {
        return studentService.allStudents()
    }

    @PostMapping("")
    fun createStudent(@RequestBody student: Student): ResponseEntity<StudentDTO> {
        val newStudent = studentService.createStudent(student)
        return ResponseEntity(newStudent, HttpStatus.CREATED)
    }

    @PutMapping("/{id}")
    fun updateStudent(@PathVariable id: String, @RequestBody update: StudentDTO): ResponseEntity<StudentDTO> {
        val updatedStudent = studentService.updateStudent(id, update) ?: return ResponseEntity(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(updatedStudent)
    }

    @DeleteMapping("/{id}")
    fun deleteStudent(@PathVariable id: String): ResponseEntity<Any> {
        val student = studentService.findStudentById(id)
        if(student==null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR, this Student does NOT EXIST")
        studentService.deleteStudent(id)
        val successMessage = "Student with ID $id successfully deleted."
        return ResponseEntity.status(HttpStatus.OK).body(successMessage)

    }
}
