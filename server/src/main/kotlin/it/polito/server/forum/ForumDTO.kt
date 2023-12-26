package it.polito.server.forum

import it.polito.server.professor.Professor
import org.springframework.data.annotation.Id
import java.sql.Timestamp
import java.time.Instant
import java.util.Date

data class ForumDTO (
    @Id val id: String? = null,
    var name: String,
    var thesis: String,
    var creationDate: Instant? = Instant.now(),
    var closeDate: Instant? = null,
    var lastMessage: Instant? = null,
    var description: String,
    var author: Professor? = null,
    var responseCount: Int? = 0,
    var status: ForumStatus? = ForumStatus.OPENED,
    var visibility: ForumVisibility? = ForumVisibility.PROTECTED,
    var viewedBy: List<ForumUser>? = mutableListOf()
) {
    fun toEntity(): Forum {
        return Forum(
            id = this.id,
            name = this.name,
            thesis = this.thesis,
            creationDate = this.creationDate,
            closeDate = this.closeDate,
            lastMessage = this.lastMessage,
            description = this.description,
            author = this.author,
            responseCount = this.responseCount,
            status = this.status,
            visibility = this.visibility,
            viewedBy = this.viewedBy
        )
    }
}
