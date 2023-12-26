package it.polito.server.forumMessage

import it.polito.server.forum.ForumUser
import org.springframework.data.annotation.Id
import java.time.Instant

data class MessageDTO (
    @Id
    val id: String? = null,
    var forumId: String,
    var date: Instant? = Instant.now(),
    var text: String,
    var author: ForumUser,
    var viewedBy: List<ForumUser>? = mutableListOf(),
    var attachments: List<String>? = mutableListOf(),
) {
    fun toEntity(): Message = Message(
        id = this.id,
        forumId = this.forumId,
        date = this.date,
        text = this.text,
        author = this.author,
        viewedBy = this.viewedBy,
        attachments = this.attachments,
    )
}
