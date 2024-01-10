package it.polito.server.courses

data class CourseDTO (
    val id: String? = null,
    var name: String,
    var code: String
) {
    fun toEntity(): Course {
        return Course(
            name = this.name,
            code = this.code
        )
    }
}