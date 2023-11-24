package it.polito.server.proposal

import java.time.LocalDate

data class ProposalDTO(
    val id: String? = null,
    var title: String,
    // to change to professor obj when implemented
    var supervisor: String,
    // to change to professor obj when implemented
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
    var archived: archiviation_type,
){
    fun toDBObj () : Proposal = Proposal(
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