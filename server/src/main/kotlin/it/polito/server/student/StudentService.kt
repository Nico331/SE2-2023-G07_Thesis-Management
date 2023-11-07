package it.polito.server.student

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class StudentService (private val studentRepository: StudentRepository) {
    fun checkPassword(student: Student, password: String): Boolean =
        student.checkPassword(password)

    fun findStudentById(id: String): StudentDTO? {
        return studentRepository.findById(id).map(Student::toDTO).orElse(null)
    }
    fun allStudents(): List<StudentDTO> {
        return studentRepository.findAll().map { it.toDTO() }
    }

    fun createStudent(student: Student): StudentDTO {
        // Assumi che la password sia già impostata in student
        val savedStudent = studentRepository.save(student)
        return savedStudent.toDTO()
    }

    fun updateStudent(id: String, update: StudentDTO): StudentDTO? {
        val student = studentRepository.findById(id).orElse(null) ?: return null

        student.name = update.name
        student.surname = update.surname
        student.email = update.email
        student.gender = update.gender
        student.codDegree = update.codDegree
        student.nationality = update.nationality

        return studentRepository.save(student).toDTO()
    }

    fun deleteStudent(id: String) {
        studentRepository.deleteById(id)
    }

}