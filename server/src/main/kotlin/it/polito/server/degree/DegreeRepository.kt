package it.polito.server.degree

import it.polito.server.annotations.CoderseeGenerated
import it.polito.server.student.Student
import org.springframework.data.mongodb.repository.MongoRepository
@CoderseeGenerated
interface DegreeRepository : MongoRepository<Degree, String> {
    fun findByCodDegree(codDegree: String): Degree?
}
