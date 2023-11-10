package it.polito.server.career

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.sql.Timestamp

@Document
data class Career(
    @Id val id: String? = null,
    var studentId: String,
    var codCourse: String,
    var titleCourse: String,
    var cfu: Int,
    var grade: Int,
    var date: String,
) {

    fun toDTO(): CareerDTO = CareerDTO(
        id = this.id,
        studentId = this.studentId,
        codCourse = this.codCourse,
        titleCourse = this.titleCourse,
        cfu = this.cfu,
        grade = this.grade,
        date = this.date
    )
}
