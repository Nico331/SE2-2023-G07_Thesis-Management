package it.polito.server.teacher

import java.util.*
data class TeacherDTO (
    val id: String? = null,
    val name : String,
    val surname : String,
    val email : String,
    val codGroup : String,
    val codDepartment : String
)