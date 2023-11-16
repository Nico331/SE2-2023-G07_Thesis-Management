package it.polito.server


import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializer
import it.polito.server.professor.ProfessorDTO
import it.polito.server.proposal.Proposal
import it.polito.server.proposal.ProposalDTO
import it.polito.server.proposal.ProposalRepository
import junit.framework.TestCase.assertEquals
import junit.framework.TestCase.assertTrue
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.*
import org.springframework.test.annotation.DirtiesContext
import org.springframework.test.context.DynamicPropertyRegistry
import org.springframework.test.context.DynamicPropertySource
import org.testcontainers.containers.MongoDBContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.junit.jupiter.Testcontainers
import org.testcontainers.shaded.com.google.common.reflect.TypeToken
import org.testcontainers.shaded.org.bouncycastle.asn1.x500.style.RFC4519Style.title
import org.testcontainers.utility.DockerImageName
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
        supervisor = "0001",
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
        supervisor = "0001",
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
        supervisor = "0003",
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
    fun createProposal() {

        val proposalToCreate = ProposalDTO(
                title = "Sviluppo di un'applicazione mobile per il monitoraggio della salute",
                supervisor = "0001",
                coSupervisors = listOf("Dr. Luca Bianchi"),
                keywords = listOf("mobile application", "health monitoring", "wearable devices"),
                type = "Sviluppo Software",
                groups = listOf("Mobile App Development Team"),
                description = "Creazione di un'applicazione mobile per monitorare parametri vitali utilizzando dispositivi indossabili.",
                requiredKnowledge = "Programmazione mobile (Android/iOS), conoscenza di wearable devices",
                notes = "Partecipazione a workshop sui dispositivi indossabili consigliata.",
                expiration = Date(),
                level = "Master",
                cdS = listOf("Informatica", "Ingegneria Informatica"),
                archived = false
        )

        val createUrl = "http://localhost:$port/API/proposals"
        val createUri = URI(createUrl)

        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_JSON
        val httpEntity = HttpEntity(proposalToCreate, headers)

        val createResult: ResponseEntity<ProposalDTO> = restTemplate.exchange(
                createUri,
                HttpMethod.POST,
                httpEntity,
                ProposalDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.CREATED, createResult.statusCode)

        val createdProposal = createResult.body
        assertNotNull(createdProposal)

        if(createdProposal != null)
        {
            assertEquals(proposalToCreate.title, createdProposal.title)
            assertEquals(proposalToCreate.supervisor, createdProposal.supervisor)
            assertIterableEquals(proposalToCreate.coSupervisors, createdProposal.coSupervisors)
            assertIterableEquals(proposalToCreate.keywords,createdProposal.keywords)
            assertEquals(proposalToCreate.type,createdProposal.type)
            assertIterableEquals(proposalToCreate.groups,createdProposal.groups)
            assertEquals(proposalToCreate.description,createdProposal.description)
            assertEquals(proposalToCreate.requiredKnowledge, createdProposal.requiredKnowledge)
            assertEquals(proposalToCreate.notes, createdProposal.notes)
            assertEquals(proposalToCreate.expiration, createdProposal.expiration)
            assertEquals(proposalToCreate.level, createdProposal.level)
            assertIterableEquals(proposalToCreate.cdS, createdProposal.cdS)
            assertEquals(proposalToCreate.archived, createdProposal.archived)

        }

        proposalRepository.deleteAll()
    }


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

        proposalRepository.deleteAll()
    }


    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun getActiveProposalsBySupervisor() {

        val proposal1 = proposalRepository.save(myProposal1)
        val proposal2 = proposalRepository.save(myProposal2)

        val inactiveProposal = proposalRepository.save(myProposal3)
        inactiveProposal.archived = true
        proposalRepository.save(inactiveProposal)

        val getActiveProposalsUrl = "http://localhost:$port/API/proposals/bysupervisor/${myProposal1.supervisor}"
        val getActiveProposalsUri = URI(getActiveProposalsUrl)

        val getActiveProposalsResult: ResponseEntity<List<ProposalDTO>> = restTemplate.exchange(
                getActiveProposalsUri,
                HttpMethod.GET,
                null,
                object : ParameterizedTypeReference<List<ProposalDTO>>() {}
        )

        Assertions.assertEquals(HttpStatus.OK, getActiveProposalsResult.statusCode)

        val activeProposalsList = getActiveProposalsResult.body
        assertNotNull(activeProposalsList)
        assertTrue(activeProposalsList!!.size >= 2)


        assertTrue(activeProposalsList.any { it.id == proposal1.id })
        assertTrue(activeProposalsList.any { it.id == proposal2.id })

        assertFalse(activeProposalsList.any { it.id == inactiveProposal.id })

        proposalRepository.deleteAll()
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun getProposalById() {

        val savedProposal = proposalRepository.save(myProposal3)
        val proposalId = savedProposal.id

        val getUrl = "http://localhost:$port/API/proposals/$proposalId"
        val getUri = URI(getUrl)

        val getResult: ResponseEntity<ProposalDTO> = restTemplate.exchange(
                getUri,
                HttpMethod.GET,
                null,
                ProposalDTO::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, getResult.statusCode)

        val proposalResponse = getResult.body
        assertNotNull(proposalResponse)

        assertEquals(savedProposal.title, proposalResponse!!.title)
        assertEquals(savedProposal.supervisor, proposalResponse.supervisor)
        assertIterableEquals(savedProposal.coSupervisors, proposalResponse.coSupervisors)
        assertIterableEquals(savedProposal.keywords, proposalResponse.keywords)
        assertEquals(savedProposal.type, proposalResponse.type)
        assertIterableEquals(savedProposal.groups, proposalResponse.groups)
        assertEquals(savedProposal.description, proposalResponse.description)
        assertEquals(savedProposal.requiredKnowledge, proposalResponse.requiredKnowledge)
        assertEquals(savedProposal.notes, proposalResponse.notes)
        assertEquals(savedProposal.expiration, proposalResponse.expiration)
        assertEquals(savedProposal.level, proposalResponse.level)
        assertIterableEquals(savedProposal.cdS, proposalResponse.cdS)
        assertEquals(savedProposal.archived, proposalResponse.archived)

        proposalRepository.deleteAll()
    }


}
