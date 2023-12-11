package it.polito.server.secretary


data class SecretaryDTO(
        val id: String? = null,
        var name: String,
        val surname : String,
        val email : String,
)