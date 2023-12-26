package it.polito.server.forum

interface ForumUserInterface {
    val id: String?
    var name: String
    var surname: String
}

data class ForumUser(
    val id: String?,
    var name: String,
    var surname: String
)
enum class UserRole {
    PROFESSOR,
    STUDENT
}
