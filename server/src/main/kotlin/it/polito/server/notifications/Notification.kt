package it.polito.server.notifications

import it.polito.server.career.CareerDTO
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class Notification(
    @Id val id: String? = null,

) {

    fun toDTO(): NotificationDTO = NotificationDTO(

    )
}
