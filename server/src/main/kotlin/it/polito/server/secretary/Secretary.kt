package it.polito.server.secretary

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Secretary(
        @Id val id: String? = null,
        var name: String,
        var surname : String,
        var email : String,

){
    fun toDTO(): SecretaryDTO = SecretaryDTO(
            id = this.id,
            name = this.name,
            surname = this.surname,
            email = this.email,
    )
}