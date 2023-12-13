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

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is ExternalCoSupervisorDTO) return false

        if (name == other.name && surname == other.surname && email == other.email) return true
        return false
    }
}
