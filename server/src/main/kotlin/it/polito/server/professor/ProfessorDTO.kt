package it.polito.server.professor

data class ProfessorDTO (
    val id: String? = null,
    val name : String,
    val surname : String,
    val email : String,
    val codGroup : String,
    val codDepartment : String
)