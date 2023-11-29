package it.polito.server

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializer
import com.google.gson.JsonObject
import it.polito.server.appliedproposal.ApplicationStatus
import it.polito.server.appliedproposal.AppliedProposal
import it.polito.server.appliedproposal.AppliedProposalDTO
import it.polito.server.appliedproposal.AppliedProposalRepository
import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import it.polito.server.security.JwtResponse
import it.polito.server.security.LoginCredentials
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertNotNull

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertIterableEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.*
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.MongoDBContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.shaded.com.google.common.reflect.TypeToken
import org.testcontainers.utility.DockerImageName

import java.time.LocalDate
import java.net.URI
import java.util.*

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppliedProposalTests {
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
    val professorCredentials = LoginCredentials("p300001@polito.it", "password")

    @LocalServerPort
    protected var port: Int = 8081

    @Autowired
    lateinit var restTemplate: TestRestTemplate

    @Autowired
    lateinit var appliedProposalRepository: AppliedProposalRepository

    val appliedProposal1 = AppliedProposal(

            proposalId = "11111",
            studentId = "12345",
            file = null
    )

    val appliedProposal2 = AppliedProposal(

            proposalId = "22222",
            studentId = "67890",
            file = null
    )

    val appliedProposal3 = AppliedProposal(

            proposalId = "33333",
            studentId = "67890",
            file = null
    )

    val appliedProposal4 = AppliedProposal(

            proposalId = "33333",
            studentId = "12345",
            file = null
    )
    val appliedProposal5 = AppliedProposal(

            proposalId = "44444",
            studentId = "13579",
            file = null
    )

/*
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testGetAllAppliedProposals() {

        val headers = HttpHeaders()
        val httpEntity = HttpEntity(null, headers)

        val baseUrl = "http://localhost:$port/API/appliedProposals"
        val uri = URI(baseUrl)

        appliedProposalRepository.save(appliedProposal1)
        appliedProposalRepository.save(appliedProposal2)

        val result: ResponseEntity<String> = restTemplate.exchange(
                uri,
                HttpMethod.GET,
                HttpEntity.EMPTY,
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
        val arrayTicketType = object : TypeToken<List<AppliedProposalDTO>>() {}.type
        val appliedProposal: List<AppliedProposalDTO> = gson.fromJson(result.body, arrayTicketType)
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        //Assertions.assertEquals(2, appliedProposal.size)

        assertEquals(appliedProposal1.proposalId, appliedProposal[0].proposalId)
        assertEquals(appliedProposal1.studentId,appliedProposal[0].studentId )

        assertEquals(appliedProposal2.proposalId, appliedProposal[1].proposalId)
        assertEquals(appliedProposal2.studentId,appliedProposal[1].studentId )

        appliedProposalRepository.deleteAll()
    }



 */
    /*
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testGetAppliedProposal() {
        val savedProposal = appliedProposalRepository.save(appliedProposal1)

        val result: ResponseEntity<AppliedProposalDTO> = restTemplate.exchange(
                "http://localhost:$port/API/appliedProposal/${savedProposal.id}",
                HttpMethod.GET,
                HttpEntity.EMPTY,
                AppliedProposalDTO::class.java
        )

        assertEquals(HttpStatus.OK, result.statusCode)
        val returnedProposal = result.body!!
        assertEquals(appliedProposal1.proposalId, returnedProposal.proposalId)
        assertEquals(appliedProposal1.studentId, returnedProposal.studentId)
        assertEquals(ApplicationStatus.PENDING, returnedProposal.status)
        assertNotNull(returnedProposal.id)

        appliedProposalRepository.deleteAll()
    }


     */
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testDeleteAppliedProposal() {
    val jwtToken = restTemplate
        .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
        .body?.jwt ?: ""
    val headers = HttpHeaders()
    headers.setBearerAuth(jwtToken)
    val httpEntity = HttpEntity(null, headers)

        val savedProposal = appliedProposalRepository.save(appliedProposal1)

        val deleteResult: ResponseEntity<Void> = restTemplate.exchange(
                "http://localhost:$port/API/appliedProposal/${savedProposal.id}",
                HttpMethod.DELETE,
                httpEntity,
                Void::class.java
        )

        assertEquals(HttpStatus.OK, deleteResult.statusCode)
        Assertions.assertFalse(appliedProposalRepository.existsById(savedProposal.id!!))
    }
/*
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testCreateApplyForProposal() {
        //se gli Id non sono presenti nel db i test falliscono
        val proposalId = "6553e78fe39d7b977c9001af"
        val studentId = "6553e78fe39d7b977c9001b9"

        val applyResult: ResponseEntity<String> = restTemplate.exchange(
                "http://localhost:$port/API/appliedProposal/apply/$proposalId/$studentId",
                HttpMethod.POST,
                HttpEntity.EMPTY,
                String::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, applyResult.statusCode)
        Assertions.assertEquals("Application successful", applyResult.body)

        val appliedProposal = appliedProposalRepository.findByProposalIdAndStudentId(proposalId, studentId)
        Assertions.assertNotNull(appliedProposal)

        appliedProposalRepository.deleteAll()
    }


 */
    /*
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testGetAppliedProposalByStudent() {
        val saved1 = appliedProposalRepository.save(appliedProposal1)
        val saved2 = appliedProposalRepository.save(appliedProposal4)

        val studentId = "12345"
        val url = "http://localhost:$port/API/appliedProposal/bystudent/$studentId"
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(null, headers)

        val result: ResponseEntity<List<AppliedProposalDTO>> = restTemplate.exchange(
                URI(url),
                HttpMethod.GET,
                httpEntity,
                object : org.springframework.core.ParameterizedTypeReference<List<AppliedProposalDTO>>() {}
        )

        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val appliedProposals: List<AppliedProposalDTO>? = result.body
        Assertions.assertNotNull(appliedProposals)
        Assertions.assertEquals(2, appliedProposals!!.size)

        assertEquals(appliedProposal1.proposalId, appliedProposals[0].proposalId)
        assertEquals(appliedProposal1.studentId, appliedProposals[0].studentId)

        assertEquals(appliedProposal4.proposalId, appliedProposals[1].proposalId)
        assertEquals(appliedProposal4.studentId, appliedProposals[1].studentId)

        appliedProposalRepository.deleteAll()
    }
     */
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testAcceptProposal() {

        val savedProposal = appliedProposalRepository.save(appliedProposal1)
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(null, headers)

        val acceptResult: ResponseEntity<Void> = restTemplate.exchange(
                "http://localhost:$port/API/appliedProposal/accept/${savedProposal.id}",
                HttpMethod.PUT,
                httpEntity,
                Void::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, acceptResult.statusCode)

        val acceptedProposal = appliedProposalRepository.findById(savedProposal.id!!).orElse(null)
        Assertions.assertNotNull(acceptedProposal)
        Assertions.assertEquals(ApplicationStatus.ACCEPTED, acceptedProposal.status)
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testRejectProposal() {
        val savedProposal = appliedProposalRepository.save(appliedProposal1)
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(null, headers)

        val rejectResult: ResponseEntity<Void> = restTemplate.exchange(
                "http://localhost:$port/API/appliedProposal/reject/${savedProposal.id}",
                HttpMethod.PUT,
                httpEntity,
                Void::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, rejectResult.statusCode)

        val rejectedProposal = appliedProposalRepository.findById(savedProposal.id!!).orElse(null)
        Assertions.assertNotNull(rejectedProposal)
        Assertions.assertEquals(ApplicationStatus.REJECTED, rejectedProposal.status)
    }


}
