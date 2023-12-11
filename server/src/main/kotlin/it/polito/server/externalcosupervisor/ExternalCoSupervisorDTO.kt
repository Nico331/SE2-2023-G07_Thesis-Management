package it.polito.server.externalcosupervisor

class ExternalCoSupervisorDTO (
    val name : String,
    val surname : String,
    val email : String
) {
    fun toDBObj(): ExternalCoSupervisor = ExternalCoSupervisor(
        name = this.name,
        surname = this.surname,
        email = this.email
    )

}
