package it.polito.server

import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializer
import com.google.gson.JsonPrimitive
import com.google.gson.JsonSerializer
import it.polito.server.forum.*
import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorRepository
import it.polito.server.security.JwtResponse
import it.polito.server.security.LoginCredentials
import it.polito.server.student.StudentService
import org.junit.jupiter.api.Assertions
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
import java.net.URI
import java.time.Instant

@Testcontainers
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class ForumTests {

    companion object {
        @Container
        val mongoDBContainer = MongoDBContainer(DockerImageName.parse("mongo")).apply {
            withExposedPorts(27017)
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
    lateinit var forumService: ForumService
    @Autowired
    lateinit var studentService: StudentService
    @Autowired
    lateinit var professorRepository: ProfessorRepository
    @Autowired
    lateinit var forumRepository: ForumRepository
    private val gson = GsonBuilder()
        .registerTypeAdapter(Instant::class.java, JsonDeserializer { json, _, _ ->
            Instant.parse(json.asJsonPrimitive.asString)
        })
        .registerTypeAdapter(Instant::class.java, JsonSerializer<Instant> { src, _, _ ->
            JsonPrimitive(src.toString())
        })
        .create()


    final val myProfessor1 = Professor (
            id = "p300001",
            name = "Mario",
            surname = "Rossi",
            email = "p300001@polito.it",
            codGroup = "24680",
            codDepartment = "55555"
    )
    final val forumId = "ForumId"
//    val myThesis =  RequestProposal(
//        id = "1",
//        title = "Title",
//        studentId = "StudentId",
//        supervisorId = "supervisorId",
//        description = "description",
//        coSupervisors = listOf("1","2"),
//        acceptanceDate = LocalDate.now(),
//        secretaryStatus = RequestProposalStatus.ACCEPTED,
//        supervisorStatus = RequestProposalStatus.ACCEPTED
//    )
    val myTopic = Forum(
        id = forumId,
        name = "Name",
        thesis = "1",
        creationDate = Instant.now(),
        closeDate = null,
        lastMessage = null,
        description = "description",
        author = myProfessor1,
        responseCount = 0,
        status = ForumStatus.OPENED,
        visibility = ForumVisibility.PUBLIC,
        viewedBy = mutableListOf()
    )
    val professorCredentials = LoginCredentials("p300001@polito.it", "p300001")
    val studentCredentials = LoginCredentials("s300001@studenti.polito.it", "s300001")

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun getOneForum() {
        val getUrl = "http://localhost:$port/API/forums/$forumId"
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", studentCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(null, headers)

        val uri = URI(getUrl)
        forumRepository.save(myTopic)
        val result: ResponseEntity<String> = restTemplate.exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            String::class.java
        )
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val forumType = object : TypeToken<ForumDTO>() {}.type
        val forum: ForumDTO? = gson.fromJson(result.body, forumType)
        Assertions.assertNotNull(forum)

        val forumDTO = myTopic.toDTO()
        Assertions.assertEquals(forumDTO.id, forum?.id)
        Assertions.assertEquals(forumDTO.name, forum?.name)
        Assertions.assertEquals(forumDTO.thesis, forum?.thesis)
        Assertions.assertEquals(forumDTO.description, forum?.description)
        Assertions.assertEquals(forumDTO.author, forum?.author)
        Assertions.assertEquals(forumDTO.responseCount, forum?.responseCount)
        Assertions.assertEquals(forumDTO.status, forum?.status)
        Assertions.assertEquals(forumDTO.visibility, forum?.visibility)
        Assertions.assertEquals(forumDTO.viewedBy, forum?.viewedBy)
    }
    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun getAllAccessibleForumsByProfessor() {
        val getUrl = "http://localhost:$port/API/forums"
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(null, headers)

        val uri = URI(getUrl)
        forumRepository.save(myTopic)
        val result: ResponseEntity<String> = restTemplate.exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            String::class.java
        )
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val forumType = object : TypeToken<List<ForumDTO>>() {}.type
        val forums: List<ForumDTO>? = (gson.fromJson(result.body, forumType))
        val forum = forums?.get(0)
        Assertions.assertNotNull(forum)

        val forumDTO = myTopic.toDTO()
        Assertions.assertEquals(forumDTO.id, forum?.id)
        Assertions.assertEquals(forumDTO.name, forum?.name)
        Assertions.assertEquals(forumDTO.thesis, forum?.thesis)
        Assertions.assertEquals(forumDTO.description, forum?.description)
        Assertions.assertEquals(forumDTO.author, forum?.author)
        Assertions.assertEquals(forumDTO.responseCount, forum?.responseCount)
        Assertions.assertEquals(forumDTO.status, forum?.status)
        Assertions.assertEquals(forumDTO.visibility, forum?.visibility)
        Assertions.assertEquals(forumDTO.viewedBy, forum?.viewedBy)
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun getAllAccessibleForumsByStudent() {
        val getUrl = "http://localhost:$port/API/forums"
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(null, headers)

        val uri = URI(getUrl)
        forumRepository.save(myTopic)
        val result: ResponseEntity<String> = restTemplate.exchange(
            uri,
            HttpMethod.GET,
            httpEntity,
            String::class.java
        )
        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val forumType = object : TypeToken<List<ForumDTO>>() {}.type
        val forums: List<ForumDTO>? = (gson.fromJson(result.body, forumType))
        val forum = forums?.get(0)
        Assertions.assertNotNull(forum)

        val forumDTO = myTopic.toDTO()
        Assertions.assertEquals(forumDTO.id, forum?.id)
        Assertions.assertEquals(forumDTO.name, forum?.name)
        Assertions.assertEquals(forumDTO.thesis, forum?.thesis)
        Assertions.assertEquals(forumDTO.description, forum?.description)
        Assertions.assertEquals(forumDTO.author, forum?.author)
        Assertions.assertEquals(forumDTO.responseCount, forum?.responseCount)
        Assertions.assertEquals(forumDTO.status, forum?.status)
        Assertions.assertEquals(forumDTO.visibility, forum?.visibility)
        Assertions.assertEquals(forumDTO.viewedBy, forum?.viewedBy)
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun createForum() {
        val getUrl = "http://localhost:$port/API/forums/new"
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", professorCredentials, JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(myTopic, headers)
        professorRepository.save(myProfessor1)
        val uri = URI(getUrl)
        val result: ResponseEntity<String> = restTemplate.exchange(
            uri,
            HttpMethod.POST,
            httpEntity,
            String::class.java
        )

        Assertions.assertEquals(HttpStatus.OK, result.statusCode)
        val forumType = object : TypeToken<ForumDTO>() {}.type
        val forum: ForumDTO? = (gson.fromJson(result.body, forumType))
        Assertions.assertNotNull(forum)

        val forumDTO = myTopic.toDTO()
        Assertions.assertEquals(forumDTO.id, forum?.id)
        Assertions.assertEquals(forumDTO.name, forum?.name)
        Assertions.assertEquals(forumDTO.thesis, forum?.thesis)
        Assertions.assertEquals(forumDTO.description, forum?.description)
        Assertions.assertEquals(forumDTO.author, forum?.author)
        Assertions.assertEquals(forumDTO.responseCount, forum?.responseCount)
        Assertions.assertEquals(forumDTO.status, forum?.status)
        Assertions.assertEquals(forumDTO.visibility, forum?.visibility)
        Assertions.assertEquals(forumDTO.viewedBy, forum?.viewedBy)
    }

    @Test
    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    fun createForumForbidden() {
        val getUrl = "http://localhost:$port/API/forums/new"
        val jwtToken = restTemplate
            .postForEntity("http://localhost:$port/API/login", LoginCredentials("p300002@polito.it","p300002"), JwtResponse::class.java)
            .body?.jwt ?: ""
        val headers = HttpHeaders()
        headers.setBearerAuth(jwtToken)
        val httpEntity = HttpEntity(myTopic, headers)
        professorRepository.save(myProfessor1)
        val uri = URI(getUrl)
        val result: ResponseEntity<String> = restTemplate.exchange(
            uri,
            HttpMethod.POST,
            httpEntity,
            String::class.java
        )
        Assertions.assertEquals(HttpStatus.FORBIDDEN, result.statusCode)
    }
}


