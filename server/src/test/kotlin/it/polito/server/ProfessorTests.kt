package it.polito.server

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializer
import com.google.gson.JsonObject
import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorRepository
import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import junit.framework.TestCase.assertEquals

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.data.annotation.Id
import org.springframework.http.*
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.MongoDBContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.shaded.com.google.common.reflect.TypeToken
import org.testcontainers.utility.DockerImageName
import org.junit.jupiter.api.Assertions.assertNotNull

import java.time.LocalDate
import java.net.URI
import java.util.*

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProfessorTests {

    companion object {
        @Container
        val mongoDBContainer = MongoDBContainer(DockerImageName.parse("mongo")).apply {
            withExposedPorts(27017) // Default port for MongoDB
        }

        @JvmStatic
        @DynamicPropertySource
        fun properties(registry: DynamicPropertyRegistry) {
            registry.add("spring.data.mongodb.uri") { mongoDBContainer.replicaSetUrl }
        }
    }

    @LocalServerPort
    protected var port: Int = 8081

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    @Autowired
    lateinit var professorRepository: ProfessorRepository


    val myProfessor1 = Professor (

            name = "Mario",
            surname = "Rossi",
            email = "mariorossi@professor.it",
            codGroup = "24680",
            codDepartment = "55555"
    )

    val myProfessor2 = Professor (

            name = "Anna",
            surname = "Neri",
            email = "annaneri@professor.it",
            codGroup = "14703",
            codDepartment = "44444"
    )

    val myProfessor3 = Professor (

            name = "Roberto",
            surname = "Verde",
            email = "robertoverde@professor.it",
            codGroup = "14703",
            codDepartment = "444444"
    )


    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun createProfessor() {

        val professorToCreate = ProfessorDTO(
                name = "John",
                surname = "Orange",
                email = "john.Orange@professor.it",
                codGroup = "11111",
                codDepartment = "22222"
        )

        val createUrl = "http://localhost:$port/API/professors"
        val createUri = URI(createUrl)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val httpEntity = HttpEntity(professorToCreate, headers)

        val createResult: ResponseEntity<ProfessorDTO> = restTemplate.exchange(
                createUri,
                HttpMethod.POST,
                httpEntity,
                ProfessorDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.CREATED, createResult.statusCode)

        val createdProfessor = createResult.body
        assertNotNull(createdProfessor)

        assertEquals(professorToCreate.name, createdProfessor!!.name)
        assertEquals(professorToCreate.surname, createdProfessor.surname)
        assertEquals(professorToCreate.email, createdProfessor.email)
        assertEquals(professorToCreate.codGroup, createdProfessor.codGroup)
        assertEquals(professorToCreate.codDepartment, createdProfessor.codDepartment)

        professorRepository.deleteAll()
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testGetAllProfessor() {

        val headers = HttpHeaders()
        val httpEntity = HttpEntity(null, headers)

        val baseUrl = "http://localhost:$port/API/professors"
        val uri = URI(baseUrl)

        professorRepository.save(myProfessor1)
        professorRepository.save(myProfessor2)

        val result: ResponseEntity<String> = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                httpEntity,
                String::class.java
        )
        println(result)

        val gson = GsonBuilder()
                .registerTypeAdapter(Date::class.java, JsonDeserializer<Date> { json, _, _ ->
                    if (json.isJsonPrimitive && json.asJsonPrimitive.isNumber) {
                        Date(json.asJsonPrimitive.asLong)
                    } else {
                        null
                    }
                })
                .create()
        val arrayTicketType = object : TypeToken<List<ProfessorDTO>>() {}.type
        val professors: List<ProfessorDTO> = gson.fromJson(result.body, arrayTicketType)
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        Assertions.assertEquals(2, professors.size)

        assertEquals(myProfessor1.name, professors[0].name)
        assertEquals(myProfessor1.surname, professors[0].surname)
        assertEquals(myProfessor1.email, professors[0].email)
        assertEquals(myProfessor1.codGroup, professors[0].codGroup)
        assertEquals(myProfessor1.codDepartment, professors[0].codDepartment)


        assertEquals(myProfessor2.name, professors[1].name)
        assertEquals(myProfessor2.surname, professors[1].surname)
        assertEquals(myProfessor2.email, professors[1].email)
        assertEquals(myProfessor2.codGroup, professors[1].codGroup)
        assertEquals(myProfessor2.codDepartment, professors[1].codDepartment)

        professorRepository.deleteAll()
    }


    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun updateProfessor() {
        val savedProfessor = professorRepository.save(myProfessor3)
        val professorId = savedProfessor.id

        val updatedProfessorDTO = myProfessor3.toDTO()

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val httpEntity = HttpEntity(updatedProfessorDTO, headers)

        val updateUrl = "http://localhost:$port/API/professors/$professorId"
        val updateUri = URI(updateUrl)

        val updateResult: ResponseEntity<ProfessorDTO> = restTemplate.exchange(
                updateUri,
                HttpMethod.PUT,
                httpEntity,
                ProfessorDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, updateResult.statusCode)
        val updatedProfessor = updateResult.body!!

        assertEquals(myProfessor3.name, updatedProfessor.name)
        assertEquals(myProfessor3.surname, updatedProfessor.surname)
        assertEquals(myProfessor3.email, updatedProfessor.email)
        assertEquals(myProfessor3.codGroup, updatedProfessor.codGroup)
        assertEquals(myProfessor3.codDepartment, updatedProfessor.codDepartment)
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun deleteProposal() {
        val savedProfessor = professorRepository.save(myProfessor2)
        val professorId = savedProfessor.id

        val deleteUrl = "http://localhost:$port/API/professors/$professorId"
        val deleteUri = URI(deleteUrl)

        val deleteResult: ResponseEntity<Void> = restTemplate.exchange(
                deleteUri,
                HttpMethod.DELETE,
                HttpEntity.EMPTY,
                Void::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, deleteResult.statusCode)

        Assertions.assertFalse(professorRepository.existsById(professorId!!))
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun getProfessorById() {

        val savedProfessor = professorRepository.save(myProfessor3)
        val professorId = savedProfessor.id

        val getUrl = "http://localhost:$port/API/professors/$professorId"
        val getUri = URI(getUrl)

        val getResult: ResponseEntity<ProfessorDTO> = restTemplate.exchange(
                getUri,
                HttpMethod.GET,
                null,
                ProfessorDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, getResult.statusCode)

        val professorResponse = getResult.body
        assertNotNull(professorResponse)

        assertEquals(savedProfessor.name, professorResponse!!.name)
        assertEquals(savedProfessor.surname, professorResponse.surname)
        assertEquals(savedProfessor.email, professorResponse.email)
        assertEquals(savedProfessor.codGroup, professorResponse.codGroup)
        assertEquals(savedProfessor.codDepartment, professorResponse.codDepartment)
    }

}