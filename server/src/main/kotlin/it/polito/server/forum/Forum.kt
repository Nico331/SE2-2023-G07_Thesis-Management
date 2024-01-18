package it.polito.server.forum

import it.polito.server.professor.Professor
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document
data class Forum (
    @Id val id: String? = null,
    var name: String,
    var thesis: String,
    var creationDate: Instant?,
    var closeDate: Instant?,
    var lastMessage: Instant?,
    var description: String,
    var author: Professor?,
    var responseCount: Int?=0,
    var status: ForumStatus?=ForumStatus.OPENED,
    var visibility: ForumVisibility?=ForumVisibility.PROTECTED,
    var viewedBy: List<ForumUser>? = mutableListOf(),
    ) {
    fun toDTO(): ForumDTO = ForumDTO (
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
        viewedBy = this.viewedBy,
    )
}

enum class ForumStatus {
    OPENED,
    CLOSED,
}

enum class ForumVisibility {
    PUBLIC, // also for students
    PROTECTED, // only for professors, co-supervisor and 1 student
    PRIVATE // only for who is in the requestProposal
}
