package it.polito.server.forumMessage

import it.polito.server.email.EmailService
import it.polito.server.forum.ForumRepository
import it.polito.server.professor.ProfessorService
import it.polito.server.requestproposal.RequestProposalService
import it.polito.server.student.StudentService
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class MessageService(
    private val messageRepository: MessageRepository,
    private val forumRepository: ForumRepository,
    private val requestProposalService: RequestProposalService,
    private val studentService: StudentService,
    private val professorService: ProfessorService,
    private val emailService: EmailService
){
    fun getLastTenMessages(forumId: String): List<MessageDTO> {
        val pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "date"))
        return messageRepository.findByForumId(forumId, pageable).content.map { it.toDTO() }
    }

    fun getMessagesByPage(forumId: String, page: Int): List<Message> {
        val pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "date"))
        return messageRepository.findByForumId(forumId, pageable).content
    }

    suspend fun newMessage ( message: MessageDTO): MessageDTO {
        val forum = forumRepository.findById(message.forumId).get()
        val thesis = requestProposalService.findRequestProposalById(forum.thesis)!!
        val student = studentService.findStudentById(thesis.studentId)!!
        if(student.id!=message.author.id){
            emailService.sendSimpleMessage(
                student.email,
                "You have a new message for \"${thesis.title}\" thesis forum",
                "Dear ${student.name} ${student.surname},\n" +
                        "You have a new message for \"${thesis.title}\" thesis forum by ${message.author.name} ${message.author.surname}:\n\n" +
                        message.text+
                        "\n\nBest regards" +
                        "\nGestione Didattica",
                "no-reply@studenti.polito.it"
            )
        }
        val professor = professorService.findProfessorById(thesis.supervisorId)!!
        if(professor.id!=message.author.id){
            emailService.sendSimpleMessage(
                professor.email,
                "You have a new message for \"${thesis.title}\" thesis forum",
                "Dear ${professor.name} ${professor.surname},\n" +
                        "You have a new message for \"${thesis.title}\" thesis forum by ${message.author.name} ${message.author.surname}:\n\n" +
                        message.text+
                        "\n\nBest regards" +
                        "\nGestione Didattica",
                "no-reply@polito.it"
            )
        }
        thesis.coSupervisors.forEach { coSupervisorId ->
            if(message.author.id!=coSupervisorId){
                val coSupervisor = professorService.findProfessorById(coSupervisorId)!!
                emailService.sendSimpleMessage(
                    coSupervisor.email,
                    "You have a new message for \"${thesis.title}\" thesis forum",
                    "Dear ${coSupervisor.name} ${coSupervisor.surname}," +
                            "\nYou have a new message for \"${thesis.title}\" thesis forum by ${message.author.name} ${message.author.surname}:\n\n" +
                            message.text +
                            "\n\nBest regards" +
                            "\nGestione Didattica",
                    "no-reply@polito.it"
                )
            }
        }

        forumRepository.save(forum.copy(responseCount = forum.responseCount?.plus(1)))
        return messageRepository.save(message.toEntity()).toDTO()
    }
}
