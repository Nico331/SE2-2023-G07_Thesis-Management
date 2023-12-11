package it.polito.server.externalcosupervisor

import org.springframework.data.mongodb.core.mapping.Document

@Document
data class ExternalCoSupervisor (
    val name : String,
    val surname : String,
    val email : String
){

    fun toDTO() : ExternalCoSupervisorDTO = ExternalCoSupervisorDTO(
        name = this.name,
        surname = this.surname,
        email = this.email
    )
}
