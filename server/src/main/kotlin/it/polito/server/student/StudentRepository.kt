package it.polito.server.student

import org.springframework.data.mongodb.repository.MongoRepository

interface StudentRepository : MongoRepository<Student, String> {
    fun findByEmail(email: String): Student?
    fun existsStudentBySurnameAndNameAndGenderAndEmailAndNationalityAndCodDegree(surname:String, name:String, gender:String, email:String, nationality:String, coddegree:String) : Boolean

}