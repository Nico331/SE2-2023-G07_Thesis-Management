package it.polito.server.forumMessage

import it.polito.server.forum.ForumRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service

@Service
class MessageService(
    private val messageRepository: MessageRepository,
    private val forumRepository: ForumRepository,
){
    fun getLastTenMessages(forumId: String): List<MessageDTO> {
        val pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "date"))
        return messageRepository.findByForumId(forumId, pageable).content.map { it.toDTO() }
    }
    fun getFirstMessage(forumId: String): MessageDTO? {
        return messageRepository.findFirstByForumIdOrderByDateAsc(forumId)?.toDTO()
    }

    fun getMessagesByPage(forumId: String, page: Int): List<Message> {
        val pageable = PageRequest.of(page, 10, Sort.by(Sort.Direction.DESC, "date"))
        return messageRepository.findByForumId(forumId, pageable).content
    }

    fun newMessage ( message: MessageDTO): MessageDTO {
        val forum = forumRepository.findById(message.forumId).get()
        forumRepository.save(forum.copy(responseCount = forum.responseCount?.plus(1)))
        return messageRepository.save(message.toEntity()).toDTO()
    }
}
