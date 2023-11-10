package it.polito.server.career

data class CareerDTO(
    val id: String? = null,
    val studentId: String,
    val codCourse: String,
    val titleCourse: String,
    val cfu: Int,
    val grade: Int,
    val date: String,
)