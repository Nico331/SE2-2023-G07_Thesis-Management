package it.polito.server.secretary


data class SecretaryDTO(
        val id: String? = null,
        var name: String
) {
    fun toDBObj () : Secretary = Secretary(
            id = this.id,
            name = this.name
    )
}