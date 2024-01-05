package it.polito.server

import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorDTO
import it.polito.server.requestproposal.RequestProposalDTO
import it.polito.server.student.Student
import it.polito.server.student.StudentController
import it.polito.server.student.StudentDTO
import it.polito.server.student.StudentService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.*

class StudentUnitTests {

    private lateinit var studentService: StudentService
    private lateinit var studentController: StudentController

    @BeforeEach
    fun setUp() {
        studentService = mock(StudentService::class.java)
        studentController = StudentController(studentService)
    }

    @Test
    fun testGetStudent() {
        val studentId = "1"
        val studentDTO = StudentDTO(id = studentId, surname = "Doe", name = "John", gender = "Male",
                nationality = "US", email = "john.doe@student.it", codDegree = "22222", enrollmentYear = 2022)

        // Configuro il mock del servizio che ritorna lo studentDTO
        `when`(studentService.findStudentById(studentId)).thenReturn(studentDTO)
        // Eseguo la chiamata all'API GETSTUDENT
        val responseEntity = studentController.getStudent(studentId)
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == studentDTO)
    }

    @Test
    fun testGetStudentNotFound() {
        val studentId = "2"
        // Configuro il mock del servizio per indicare NULL
        `when`(studentService.findStudentById(studentId)).thenReturn(null)
        // Eseguo la chiamata all'API GETSTUDENT
        val responseEntity = studentController.getStudent(studentId)
        // Verifico che la risposta sia NOT_FOUND
        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }


    @Test
    fun testAllStudents() {
        val studentDTOList = listOf(
                StudentDTO(id = "1", surname = "Doe", name = "John", gender = "Male",
                        nationality = "US", email = "john.doe@student.it", codDegree = "22222", enrollmentYear = 2022),
                StudentDTO(id = "2", surname = "Red" , name = "Alex", gender = "Male",
                        nationality = "England", email = "redalex@student.it", codDegree = "11111", enrollmentYear = 2023)
        )
        // Configuro il mock del servizio per indicare la LISTA di StudentDTO
        `when`(studentService.allStudents()).thenReturn(studentDTOList)
        // Eseguo la chiamata all'API ALLSTUDENTS
        val responseEntityList = studentController.allStudents()
        // Verifico che la risposta sia la LISTA di StudentDTO
        assert(responseEntityList == studentDTOList)
    }

    @Test
    fun testAllStudentsEmptyList() {
        val emptyList: List<StudentDTO> = emptyList()

        `when`(studentService.allStudents())
                .thenReturn(emptyList)

        val responseEntity = studentController.allStudents()

        assert(responseEntity == emptyList)
    }


    @Test
    fun testCreateStudent() {
        val newStudent = Student(
                surname = "New",
                name = "Student",
                gender = "Male",
                nationality = "Italy",
                email = "newstudent@student.it",
                codDegree = "33333",
                enrollmentYear = 2023
        )
        // Configuro il mock del servizio per indicare NewStudent + CREATED
        `when`(studentService.createStudent(newStudent)).thenReturn(ResponseEntity(newStudent, HttpStatus.CREATED))
        // Eseguo la chiamata all'API CREATESTUDENT
        val responseEntity = studentController.createStudent(newStudent)
        // Verifico che la risposta sia CREATED
        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == newStudent)
    }

    @Test
    fun testCreateExistingStudent() {
        val existingStudent = Student(
                surname = "Existing",
                name = "Student",
                gender = "Male",
                nationality = "Italy",
                email = "existingstudent@student.it",
                codDegree = "11111",
                enrollmentYear = 2022
        )
        // Configuro il mock del servizio per indicare BAD_REQUEST
        `when`(studentService.createStudent(existingStudent)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("existing student"))
        // Eseguo la chiamata all'API CREATESTUDENT
        val responseEntity = studentController.createStudent(existingStudent)
        // Verifico che la risposta sia BAD_REQUEST
        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "existing student")
    }

    @Test
    fun testCreateStudentError() {
        val newStudent = Student(
                surname = "New",
                name = "Student",
                gender = "Male",
                nationality = "Italy",
                email = "newstudent@student.it",
                codDegree = "22222",
                enrollmentYear = 2023
        )

        // Configuro il mock del servizio per indicare un errore durante la creazione dello studente
        `when`(studentService.createStudent(newStudent)).thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating student"))
        // Eseguo la chiamata all'API CREATESTUDENT
        val responseEntity = studentController.createStudent(newStudent)
        // Verifico che la risposta sia INTERNAL_SERVER_ERROR
        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Error creating student")
    }

    @Test
    fun testUpdateStudent() {
        val studentId = "1"
        val updatedStudentDTO = StudentDTO(
                surname = "Updated",
                name = "Student",
                gender = "Male",
                nationality = "US",
                email = "updatedstudent@student.it",
                codDegree = "11111",
                enrollmentYear = 2023
        )
        // Configuro il mock del servizio che ritorna StudentDTO
        `when`(studentService.updateStudent(studentId, updatedStudentDTO)).thenReturn(
                StudentDTO(id = studentId, surname = "Updated", name = "Student", gender = "Male",
                        nationality = "US", email = "updatedstudent@student.it", codDegree = "11111", enrollmentYear = 2023)
        )
        // Eseguo la chiamata all'API UPDATESTUDENT
        val responseEntity = studentController.updateStudent(studentId, updatedStudentDTO)
        // Verifico che la risposta sia OK
        assert(responseEntity.statusCode == HttpStatus.OK)
    }

    @Test
    fun testUpdateStudentNotFound() {
        val invalidStudentId = "99"
        val updateStudentDTO = StudentDTO(
                surname = "Updated",
                name = "Student",
                gender = "Male",
                nationality = "US",
                email = "updatedstudent@student.it",
                codDegree = "11111",
                enrollmentYear = 2023
        )
        `when`(studentService.updateStudent(invalidStudentId, updateStudentDTO)).thenReturn(null)

        val responseEntity = studentController.updateStudent(invalidStudentId, updateStudentDTO)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }


    @Test
    fun testDeleteExistingStudent() {
        val studentId = "1"

        // Configuro il mock del servizio per indicare che lo studente esiste
        `when`(studentService.deleteStudent(studentId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body("Student with ID $studentId successfully deleted.")
        )

        // Esegui la chiamata all'API DELETE
        val responseEntity = studentController.deleteStudent(studentId)

        // Verifica che la risposta sia OK
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Student with ID $studentId successfully deleted.")
    }

    @Test
    fun testDeleteNonExistingStudent() {
        val nonExistingStudentId = "99"

        // Configura il mock del servizio per indicare che lo studente non esiste
        `when`(studentService.deleteStudent(nonExistingStudentId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("This student does NOT EXIST")
        )

        // Esegui la chiamata all'API DELETE
        val responseEntity = studentController.deleteStudent(nonExistingStudentId)

        // Verifica che la risposta sia NOT_FOUND
        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "This student does NOT EXIST")
    }

    @Test
    fun testDeleteStudentError() {
        val studentId = "1"
        // Configuro il mock del servizio per indicare un errore durante l'eliminazione dello studente
        `when`(studentService.deleteStudent(studentId)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting student")
        )
        // Eseguo la chiamata all'API DELETE
        val responseEntity = studentController.deleteStudent(studentId)
        // Verifico che la risposta sia INTERNAL_SERVER_ERROR
        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Error deleting student")
    }

    @Test
    fun testToDTO() {
        val student = Student(
                surname = "Updated",
                name = "Student",
                gender = "Male",
                nationality = "US",
                email = "updatedstudent@student.it",
                codDegree = "11111",
                enrollmentYear = 2023
        )

        val studentDTO = student.toDTO()

        assert(studentDTO.id == student.id)
        assert(studentDTO.name == student.name)
        assert(studentDTO.surname == student.surname)
        assert(studentDTO.gender == student.gender)
        assert(studentDTO.nationality == student.nationality)
        assert(studentDTO.email == student.email)
        assert(studentDTO.codDegree == student.codDegree)
        assert(studentDTO.enrollmentYear == student.enrollmentYear)
    }

}