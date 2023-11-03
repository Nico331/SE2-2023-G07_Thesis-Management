package it.polito.server.student

data class StudentDTO(
    val id: String? = null,
    var surname: String,
    var name: String,
    var gender: String,
    var nationality: String,
    var email: String,
    var codDegree: String,
    var enrollmentYear: Int
)
