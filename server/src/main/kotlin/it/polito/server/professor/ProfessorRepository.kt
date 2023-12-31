package it.polito.server.professor

import it.polito.server.student.Student
import org.springframework.data.mongodb.repository.MongoRepository

interface ProfessorRepository : MongoRepository<Professor, String> {
    fun findByEmail(email: String): Professor?
    fun existsProfessorByNameAndSurnameAndEmailAndCodGroupAndCodDepartment(name:String, surname:String, email: String, codgroup:String, coddepartment:String) : Boolean

}