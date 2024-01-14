package it.polito.server

import it.polito.server.email.EmailService
import it.polito.server.forum.*
import it.polito.server.forumMessage.Message
import it.polito.server.forumMessage.MessageRepository
import it.polito.server.forumMessage.MessageService
import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorService
import it.polito.server.requestproposal.RequestProposal
import it.polito.server.requestproposal.RequestProposalService
import it.polito.server.requestproposal.RequestProposalStatus
import it.polito.server.student.Student
import it.polito.server.student.StudentService
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import java.time.Instant
import java.time.LocalDate
import java.util.*

class MessageServiceTests {

    private lateinit var messageService: MessageService
    private lateinit var messageRepository: MessageRepository
    private lateinit var forumRepository: ForumRepository
    private lateinit var requestProposalService: RequestProposalService
    private lateinit var studentService: StudentService
    private lateinit var professorService: ProfessorService
    private lateinit var emailService: EmailService

    @BeforeEach
    fun setUp() {
        messageRepository = mock(MessageRepository::class.java)
        forumRepository = mock(ForumRepository::class.java)
        requestProposalService = mock(RequestProposalService::class.java)
        studentService = mock(StudentService::class.java)
        professorService = mock(ProfessorService::class.java)
        emailService = mock(EmailService::class.java)

        messageService = MessageService(
            messageRepository,
            forumRepository,
            requestProposalService,
            studentService,
            professorService,
            emailService
        )
    }
    private val author = ForumUser(
        id="p300001",
        name = "John",
        surname = "Smith"
    )
    private val forumId = "forum123"
    private val studentId = "1"
    private val messages = mutableListOf(
        Message(id = "1", forumId = forumId, text = "Message 1", author = author),
        Message(id = "2", forumId = forumId, text = "Message 2", author = author),
        Message(id = "3", forumId = forumId, text = "Message 3", author = author),
    )
    private val myProfessor = Professor (
        id = "p300001",
        name = "Mario",
        surname = "Rossi",
        email = "p300001@polito.it",
        codGroup = "24680",
        codDepartment = "55555"
    )
    private val thesisId = "1"
    private val myThesis =  RequestProposal(
        id = thesisId,
        title = "Title",
        studentId = studentId,
        supervisorId = "p300001",
        description = "description",
        coSupervisors = listOf("p300001"),
        acceptanceDate = LocalDate.now(),
        secretaryStatus = RequestProposalStatus.ACCEPTED,
        supervisorStatus = RequestProposalStatus.ACCEPTED
    )
    private val myTopic = Forum(
        id = forumId,
        name = "Name",
        thesis = thesisId,
        creationDate = Instant.now(),
        closeDate = null,
        lastMessage = null,
        description = "description",
        author = myProfessor,
        responseCount = 0,
        status = ForumStatus.OPENED,
        visibility = ForumVisibility.PUBLIC,
        viewedBy = mutableListOf()
    )
    @Test
    fun testGetLastTenMessages() {
        `when`(messageRepository.findByForumId(forumId, PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "date")))).thenReturn(
            PageImpl(messages)
        )
        val result = messageService.getLastTenMessages(forumId)
        assertEquals(3, result.size)
    }

    @Test
    fun testGetMessagesByPage() {
        `when`(messageRepository.findByForumId(forumId, PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "date")))).thenReturn(
            PageImpl(messages)
        )
        val result = messageService.getLastTenMessages(forumId)
        assertEquals(3, result.size)
    }

    @Test
    fun testNewMessage() = runTest {
        val forumId = "forum123"
        val messageDTO = messages[0].toDTO()
        val forum = myTopic
        val thesis = myThesis
        val student = Student (
                id = studentId,
                surname = "Tudor",
                name = "Emily",
                gender = "Female",
                nationality = "England",
                email = "emilytudor@student.com",
                codDegree = "22222",
                enrollmentYear = 2020
        )
        val professor = myProfessor

        `when`(forumRepository.findById(forumId)).thenReturn(Optional.of(forum))
        `when`(requestProposalService.findRequestProposalById(thesisId)).thenReturn(thesis.toDTO())
        `when`(studentService.findStudentById(studentId)).thenReturn(student.toDTO())
        `when`(professorService.findProfessorById("p300001")).thenReturn(professor.toDTO())
        `when`(messageRepository.save(messageDTO.toEntity())).thenReturn(messageDTO.toEntity())
        val result = messageService.newMessage(messageDTO)
        assertEquals(result, messageDTO)
        verify(emailService).sendSimpleMessage(anyString(), anyString(), anyString(), anyString())
        verify(emailService).sendSimpleMessage(anyString(), anyString(), anyString(), anyString())
        verify(emailService, times(thesis.coSupervisors.size)).sendSimpleMessage(anyString(), anyString(), anyString(), anyString())

        verify(forumRepository).save(any())
        verify(messageRepository).save(any())

    }

}
