package it.polito.server.professor

import org.springframework.data.mongodb.repository.MongoRepository

interface ProfessorRepository : MongoRepository<Professor, String> {
    fun existsProfessorByNameAndSurnameAndEmailAndCodGroupAndCodDepartment(name:String, surname:String, email: String, codgroup:String, coddepartment:String) : Boolean

}