package it.polito.server
//
//import com.google.gson.Gson
//import com.google.gson.GsonBuilder
//import com.google.gson.JsonDeserializer
//import com.google.gson.JsonObject
//import it.polito.server.professor.Professor
//import it.polito.server.professor.ProfessorDTO
//import it.polito.server.professor.ProfessorRepository
//import it.polito.server.proposal.Proposal
//import it.polito.server.proposal.ProposalDTO
//import it.polito.server.proposal.ProposalRepository
//import it.polito.server.student.Student
//import it.polito.server.student.StudentDTO
//import it.polito.server.student.StudentRepository
//import junit.framework.TestCase.assertEquals
//
//import org.junit.jupiter.api.Assertions
//import org.junit.jupiter.api.Assertions.assertIterableEquals
//import org.junit.jupiter.api.Test
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
//import org.springframework.boot.test.context.SpringBootTest
//import org.springframework.boot.test.web.client.TestRestTemplate
//import org.springframework.boot.test.web.server.LocalServerPort
//import org.springframework.data.annotation.Id
//import org.springframework.http.*
//import org.springframework.test.annotation.DirtiesContext
//import org.springframework.test.context.DynamicPropertyRegistry
//import org.springframework.test.context.DynamicPropertySource
//import org.testcontainers.containers.MongoDBContainer
//import org.testcontainers.junit.jupiter.Container
//import org.testcontainers.junit.jupiter.Testcontainers
//import org.testcontainers.shaded.com.google.common.reflect.TypeToken
//import org.testcontainers.utility.DockerImageName
//import org.junit.jupiter.api.Assertions.assertNotNull
//
//import java.time.LocalDate
//import java.net.URI
//import java.util.*
//
//@Testcontainers
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//class StudentTests {
//
//    companion object {
//        @Container
//        val mongoDBContainer = MongoDBContainer(DockerImageName.parse("mongo")).apply {
//            withExposedPorts(27017) // Default port for MongoDB
//        }
//
//        @JvmStatic
//        @DynamicPropertySource
//        fun properties(registry: DynamicPropertyRegistry) {
//            registry.add("spring.data.mongodb.uri") { mongoDBContainer.replicaSetUrl }
//        }
//    }
//
//    @LocalServerPort
//    protected var port: Int = 8081
//
//    @Autowired
//    lateinit var restTemplate: TestRestTemplate
//
//    @Autowired
//    lateinit var studentRepository: StudentRepository
//
//
//    val myStudent1 = Student (
//
//            surname = "Gravile",
//            name = "Matteo",
//            gender = "Male",
//            nationality = "Italy",
//            email = "matteogravile@student.com",
//            codDegree = "11111",
//            enrollmentYear = 2022
//    )
//
//    val myStudent2 = Student (
//
//            surname = "Tudor",
//            name = "Emily",
//            gender = "Female",
//            nationality = "England",
//            email = "emilytudor@student.com",
//            codDegree = "22222",
//            enrollmentYear = 2020
//    )
//
//    val myStudent3 = Student (
//
//            surname = "Martini",
//            name = "Luca",
//            gender = "Male",
//            nationality = "Italy",
//            email = "martiniluca@student.com",
//            codDegree = "33333",
//            enrollmentYear = 2016
//    )
//
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    fun createStudent() {
//
//        val studentToCreate = StudentDTO(
//
//                surname = "Davis",
//                name = "Eve",
//                gender = "Female",
//                nationality = "England",
//                email = "evedavis@student.com",
//                codDegree = "44444",
//                enrollmentYear = 2023
//        )
//
//        val createUrl = "http://localhost:$port/API/students"
//        val createUri = URI(createUrl)
//
//        val headers = HttpHeaders()
//        headers.contentType = MediaType.APPLICATION_JSON
//        val httpEntity = HttpEntity(studentToCreate, headers)
//
//        val createResult: ResponseEntity<StudentDTO> = restTemplate.exchange(
//                createUri,
//                HttpMethod.POST,
//                httpEntity,
//                StudentDTO::class.java
//        )
//
//        Assertions.assertEquals(HttpStatus.CREATED, createResult.statusCode)
//
//        val createdStudent = createResult.body
//        assertNotNull(createdStudent)
//
//        assertEquals(studentToCreate.name, createdStudent!!.name)
//        assertEquals(studentToCreate.surname, createdStudent.surname)
//        assertEquals(studentToCreate.gender,createdStudent.gender)
//        assertEquals(studentToCreate.nationality,createdStudent.nationality)
//        assertEquals(studentToCreate.email, createdStudent.email)
//        assertEquals(studentToCreate.codDegree,createdStudent.codDegree)
//        assertEquals(studentToCreate.enrollmentYear,createdStudent.enrollmentYear)
//    }
//
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    fun getStudentById() {
//        val savedStudent = studentRepository.save(myStudent1)
//        val studentId = savedStudent.id
//
//        val getUrl = "http://localhost:$port/API/students/$studentId"
//        val getUri = URI(getUrl)
//
//        val getResult: ResponseEntity<StudentDTO> = restTemplate.exchange(
//                getUri,
//                HttpMethod.GET,
//                null,
//                StudentDTO::class.java
//        )
//
//        Assertions.assertEquals(HttpStatus.OK, getResult.statusCode)
//
//        val studentResponse = getResult.body
//        assertNotNull(studentResponse)
//
//        assertEquals(savedStudent.name, studentResponse!!.name)
//        assertEquals(savedStudent.surname, studentResponse.surname)
//        assertEquals(savedStudent.gender,studentResponse.gender)
//        assertEquals(savedStudent.nationality,studentResponse.nationality)
//        assertEquals(savedStudent.email, studentResponse.email)
//        assertEquals(savedStudent.codDegree,studentResponse.codDegree)
//        assertEquals(savedStudent.enrollmentYear,studentResponse.enrollmentYear)
//
//    }
///*
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    fun getAllStudents() {
//
//        val headers = HttpHeaders()
//        val httpEntity = HttpEntity(null, headers)
//
//        val baseUrl = "http://localhost:$port/API/students"
//        val uri = URI(baseUrl)
//
//        studentRepository.save(myStudent1)
//        studentRepository.save(myStudent2)
//
//        val result: ResponseEntity<String> = restTemplate.exchange(
//                uri,
//                HttpMethod.GET,
//                httpEntity,
//                String::class.java
//        )
//        println(result)
//
//        val gson = GsonBuilder()
//                .registerTypeAdapter(Date::class.java, JsonDeserializer<Date> { json, _, _ ->
//                    if (json.isJsonPrimitive && json.asJsonPrimitive.isNumber) {
//                        Date(json.asJsonPrimitive.asLong)
//                    } else {
//                        null
//                    }
//                })
//                .create()
//        val arrayTicketType = object : TypeToken<List<StudentDTO>>() {}.type
//        val students: List<StudentDTO> = gson.fromJson(result.body, arrayTicketType)
//        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
//        Assertions.assertEquals(2, students.size)
//
//        assertEquals(myStudent1.name, students[0].name)
//        assertEquals(myStudent1.surname, students[0].surname)
//        assertEquals(myStudent1.email, students[0].email)
//        assertEquals(myStudent1.gender, students[0].gender)
//        assertEquals(myStudent1.nationality, students[0].nationality)
//        assertEquals(myStudent1.enrollmentYear, students[0].enrollmentYear)
//
//
//        assertEquals(myStudent2.name, students[1].name)
//        assertEquals(myStudent2.surname, students[1].surname)
//        assertEquals(myStudent2.email, students[1].email)
//        assertEquals(myStudent2.gender, students[1].gender)
//        assertEquals(myStudent2.nationality, students[1].nationality)
//        assertEquals(myStudent2.enrollmentYear, students[1].enrollmentYear)
//
//        studentRepository.deleteAll()
//    }
//
// */
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    fun updateProfessor() {
//        val savedStudent = studentRepository.save(myStudent3)
//        val studentId = savedStudent.id
//
//        val updatedStudentDTO = myStudent3.toDTO()
//
//        val headers = HttpHeaders()
//        headers.contentType = MediaType.APPLICATION_JSON
//        val httpEntity = HttpEntity(updatedStudentDTO, headers)
//
//        val updateUrl = "http://localhost:$port/API/students/$studentId"
//        val updateUri = URI(updateUrl)
//
//        val updateResult: ResponseEntity<StudentDTO> = restTemplate.exchange(
//                updateUri,
//                HttpMethod.PUT,
//                httpEntity,
//                StudentDTO::class.java
//        )
//
//        Assertions.assertEquals(HttpStatus.OK, updateResult.statusCode)
//        val updatedStudent = updateResult.body!!
//
//        assertEquals(myStudent3.name, updatedStudent.name)
//        assertEquals(myStudent3.surname, updatedStudent.surname)
//        assertEquals(myStudent3.email, updatedStudent.email)
//        assertEquals(myStudent3.gender, updatedStudent.gender)
//        assertEquals(myStudent3.nationality, updatedStudent.nationality)
//        assertEquals(myStudent3.enrollmentYear, updatedStudent.enrollmentYear)
//    }
//
//    @Test
//    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
//    fun deleteStudent() {
//        val savedStudent = studentRepository.save(myStudent1)
//        val studentId = savedStudent.id
//
//        val deleteUrl = "http://localhost:$port/API/students/$studentId"
//        val deleteUri = URI(deleteUrl)
//
//        val deleteResult: ResponseEntity<Void> = restTemplate.exchange(
//                deleteUri,
//                HttpMethod.DELETE,
//                null,
//                Void::class.java
//        )
//
//        Assertions.assertEquals(HttpStatus.OK, deleteResult.statusCode)
//    }
//
//
//
//}
