package it.polito.server.forumMessage

import it.polito.server.forum.ForumUser
import it.polito.server.professor.Professor
import it.polito.server.requestproposal.RequestProposal
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.sql.Timestamp
import java.time.Instant

@Document
data class Message (
    @Id val id: String? = null,
    var forumId: String,
    var date: Instant? = Instant.now(),
    var text: String,
    var author: ForumUser,
    var viewedBy: List<ForumUser>? = listOf(),
    var attachments: List<String>? = mutableListOf(),
) {
    fun toDTO(): MessageDTO = MessageDTO (
        id = this.id,
        forumId = this.forumId,
        date = this.date,
        text = this.text,
        author = this.author,
        viewedBy = this.viewedBy,
        attachments = this.attachments,
    )
}
