package it.polito.server.proposal

import it.polito.server.externalcosupervisor.ExternalCoSupervisorRepository
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document
data class Proposal(
    @Id val id: String? = null,
    var title: String,
    var supervisor: String,
    var coSupervisors: List<String>,
    var keywords: List<String>,
    var type: String,
    var groups: List<String>,
    var description: String,
    var requiredKnowledge: String,
    var notes: String,
    var expiration: LocalDate,
    var level: String,
    var cdS: List<String>,
    var archived: archiviation_type
) {

    fun toDTO( externalCoSupervisorRepository : ExternalCoSupervisorRepository): ProposalDTO = ProposalDTO (
        id = this.id,
        title = this.title,
        supervisor = this.supervisor,
        coSupervisors = this.coSupervisors.filter { !it.contains('@') },
        externalCoSupervisors = this.coSupervisors.filter { it.contains('@') }.map { externalCoSupervisorRepository.findByEmail(it).toDTO() },
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

public enum class archiviation_type {
    EXPIRED,
    MANUALLY_ARCHIVED,
    NOT_ARCHIVED
}
