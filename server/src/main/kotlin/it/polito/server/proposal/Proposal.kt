package it.polito.server.proposal

import it.polito.server.student.StudentDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.util.Date

@Document
data class Proposal(
    @Id val id: String? = null,
    var title: String,
    // to change to professor obj when implemented
    var supervisor: String,
    // to change to professor obj when implemented
    var coSupervisors: List<String>,
    var keywords: List<String>,
    var type: String,
    var groups: List<String>,
    var description: String,
    var requiredKnowledge : String,
    var notes : String,
    var expiration : Date,
    var level: String,
    var cdS : List<String>,
    var archived : Boolean
) {

    fun toDTO(): ProposalDTO = ProposalDTO (
        id = this.id,
        title = this.title,
        supervisor = this.supervisor,
        coSupervisors = this.coSupervisors,
        keywords = this.keywords,
        type = this.type,
        groups = this.groups,
        description = this.description,
        requiredKnowledge = this.requiredKnowledge,
        notes = this.notes,
        expiration = this.expiration,
        level = this.level,
        cdS = this.cdS,
        archived = this.archived,
    )
}
