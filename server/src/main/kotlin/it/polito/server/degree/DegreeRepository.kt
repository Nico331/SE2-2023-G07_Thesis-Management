package it.polito.server.degree

import it.polito.server.student.Student
import org.springframework.data.mongodb.repository.MongoRepository

interface DegreeRepository : MongoRepository<Degree, String> {
    fun findByCodDegree(codDegree: String): Degree?
}