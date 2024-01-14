package it.polito.server.proposal

import it.polito.server.externalcosupervisor.ExternalCoSupervisorDTO
import java.time.LocalDate

data class ProposalDTO(
    val id: String? = null,
    var title: String,
    var supervisor: String,
    var coSupervisors: List<String>,
    var externalCoSupervisors : List<ExternalCoSupervisorDTO>? = null,
    var keywords: List<String>,
    var type: String,
    var groups: List<String>,
    var description: String,
    var requiredKnowledge: String,
    var notes: String,
    var expiration: LocalDate,
    var level: String,
    var cdS: List<String>,
    var archived: archiviation_type ? = archiviation_type.NOT_ARCHIVED,
){
    fun toDBObj () : Proposal = Proposal(
        id = this.id,
        title = this.title,
        supervisor = this.supervisor,
        coSupervisors = this.coSupervisors + (this.externalCoSupervisors?.map { it.email } ?: listOf()),
        keywords = this.keywords,
        type = this.type,
        groups = this.groups,
        description = this.description,
        requiredKnowledge = this.requiredKnowledge,
        notes = this.notes,
        expiration = this.expiration,
        level = this.level,
        cdS = this.cdS,
        archived = this.archived!!,
    )
}