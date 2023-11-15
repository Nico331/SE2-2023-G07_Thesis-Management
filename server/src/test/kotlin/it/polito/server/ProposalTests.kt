package it.polito.server


import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializer
import com.google.gson.JsonObject
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
class ProductTests {
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
    lateinit var proposalRepository: ProposalRepository


    val myProposal1 = Proposal(
        title = "Algoritmi di Machine Learning per l'analisi del testo",
        supervisor = "Prof. Mario Rossi",
        coSupervisors = listOf("Prof. Giulia Bianchi", "Prof. Luca Verdi"),
        keywords = listOf("machine learning", "NLP", "text analytics"),
        type = "Ricerca",
        groups = listOf("ML Group"),
        description = "Un progetto di ricerca volto a sviluppare nuovi algoritmi per l'analisi del testo.",
        requiredKnowledge = "Python, PyTorch, NLP basics",
        notes = "Richiesta familiarità con le reti neurali.",
        expiration = Date(),
        level = "Master",
        cdS = listOf("Informatica", "Data Science"),
        archived = false
    )

    val myProposal2 = Proposal(
        title = "Sviluppo di un'applicazione mobile per la gestione di attività personali",
        supervisor = "Prof. Anna Neri",
        coSupervisors = listOf("Prof. Carlo Conti"),
        keywords = listOf("app development", "productivity", "cross-platform"),
        type = "Sviluppo Software",
        groups = listOf("AppDev Group"),
        description = "Creazione di un'applicazione cross-platform per migliorare la gestione del tempo.",
        requiredKnowledge = "Kotlin, Flutter, design patterns",
        notes = "Preferibile esperienza con sistemi iOS e Android.",
        expiration = Date(),
        level = "Laurea",
        cdS = listOf("Informatica", "Ingegneria del Software"),
        archived = false
    )

    val myProposal3 = Proposal(
        title = "Analisi delle reti sociali per l'identificazione delle tendenze del mercato",
        supervisor = "Prof. Roberto Verde",
        coSupervisors = listOf(),
        keywords = listOf("social network analysis", "market trends", "data mining"),
        type = "Analisi Dati",
        groups = listOf("SocialNet Group"),
        description = "Utilizzo di tecniche di data mining per analizzare le reti sociali e identificare le tendenze del mercato.",
        requiredKnowledge = "R, Python, data mining techniques",
        notes = "Necessaria buona conoscenza di statistica.",
        expiration = Date(),
        level = "Dottorato",
        cdS = listOf("Statistica", "Economia e Commercio"),
        archived = false
    )

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun testGetAllProducts() {

        val headers = HttpHeaders()
        val httpEntity = HttpEntity(null, headers)

        val baseUrl = "http://localhost:$port/API/proposals"
        val uri = URI(baseUrl)

        proposalRepository.save(myProposal1)
        proposalRepository.save(myProposal2)

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
        val arrayTicketType = object : TypeToken<List<ProposalDTO>>() {}.type
        val proposals: List<ProposalDTO> = gson.fromJson(result.body, arrayTicketType)
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        Assertions.assertEquals(2, proposals.size)

        assertEquals(myProposal1.title, proposals[0].title)
        assertEquals(myProposal1.supervisor, proposals[0].supervisor)
        assertIterableEquals(myProposal1.coSupervisors, proposals[0].coSupervisors)
        assertIterableEquals(myProposal1.keywords, proposals[0].keywords)
        assertEquals(myProposal1.type, proposals[0].type)
        assertIterableEquals(myProposal1.groups, proposals[0].groups)
        assertEquals(myProposal1.description, proposals[0].description)
        assertEquals(myProposal1.requiredKnowledge, proposals[0].requiredKnowledge)
        assertEquals(myProposal1.notes, proposals[0].notes)
        assertEquals(myProposal1.expiration, proposals[0].expiration)
        assertEquals(myProposal1.level, proposals[0].level)
        assertIterableEquals(myProposal1.cdS, proposals[0].cdS)
        assertEquals(myProposal1.archived, proposals[0].archived)

        assertEquals(myProposal2.title, proposals[1].title)
        assertEquals(myProposal2.supervisor, proposals[1].supervisor)
        assertIterableEquals(myProposal2.coSupervisors, proposals[1].coSupervisors)
        assertIterableEquals(myProposal2.keywords, proposals[1].keywords)
        assertEquals(myProposal2.type, proposals[1].type)
        assertIterableEquals(myProposal2.groups, proposals[1].groups)
        assertEquals(myProposal2.description, proposals[1].description)
        assertEquals(myProposal2.requiredKnowledge, proposals[1].requiredKnowledge)
        assertEquals(myProposal2.notes, proposals[1].notes)
        assertEquals(myProposal2.expiration, proposals[1].expiration)
        assertEquals(myProposal2.level, proposals[1].level)
        assertIterableEquals(myProposal2.cdS, proposals[1].cdS)
        assertEquals(myProposal2.archived, proposals[1].archived)
        proposalRepository.deleteAll()
    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun updateProposal() {
        val savedProposal = proposalRepository.save(myProposal1)
        val proposalId = savedProposal.id

        val updatedProposalDTO = myProposal2.toDTO()

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val httpEntity = HttpEntity(updatedProposalDTO, headers)

        val updateUrl = "http://localhost:$port/API/proposals/$proposalId"
        val updateUri = URI(updateUrl)

        val updateResult: ResponseEntity<ProposalDTO> = restTemplate.exchange(
            updateUri,
            HttpMethod.PUT,
            httpEntity,
            ProposalDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, updateResult.statusCode)
        val updatedProposal = updateResult.body!!

        assertEquals(myProposal2.title, updatedProposal.title)
        assertEquals(myProposal2.supervisor, updatedProposal.supervisor)
        assertIterableEquals(myProposal2.coSupervisors, updatedProposal.coSupervisors)
        assertIterableEquals(myProposal2.keywords, updatedProposal.keywords)
        assertEquals(myProposal2.type, updatedProposal.type)
        assertIterableEquals(myProposal2.groups, updatedProposal.groups)
        assertEquals(myProposal2.description, updatedProposal.description)
        assertEquals(myProposal2.requiredKnowledge, updatedProposal.requiredKnowledge)
        Assertions.assertEquals(myProposal2.notes, updatedProposal.notes)

        assertEquals(myProposal2.expiration, updatedProposal.expiration)

        assertEquals(myProposal2.level, updatedProposal.level)
        assertIterableEquals(myProposal2.cdS, updatedProposal.cdS)
        assertEquals(myProposal2.archived, updatedProposal.archived)
        proposalRepository.deleteAll()
    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun deleteProposal() {
        val savedProposal = proposalRepository.save(myProposal2)
        val proposalId = savedProposal.id

        val deleteUrl = "http://localhost:$port/API/proposals/$proposalId"
        val deleteUri = URI(deleteUrl)

        val deleteResult: ResponseEntity<Void> = restTemplate.exchange(
            deleteUri,
            HttpMethod.DELETE,
            HttpEntity.EMPTY,
            Void::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, deleteResult.statusCode)

        Assertions.assertFalse(proposalRepository.existsById(proposalId!!))
    }


}
