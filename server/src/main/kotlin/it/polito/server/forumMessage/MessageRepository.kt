package it.polito.server.forumMessage

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.mongodb.repository.MongoRepository

interface MessageRepository : MongoRepository<Message, String> {
    fun findByForumId(forumId: String, pageable: Pageable): Page<Message>
    fun findFirstByForumIdOrderByDateAsc(forumId: String): Message?

}
