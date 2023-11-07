package it.polito.server.proposal

import java.util.*

data class ProposalDTO (
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
    var requiredKnowledge : String,
    var notes : String,
    var expiration : Date,
    var level: String,
    var cdS : List<String>,
)