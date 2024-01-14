package it.polito.server.degree

import it.polito.server.annotations.CoderseeGenerated
import org.springframework.data.mongodb.repository.MongoRepository
@CoderseeGenerated
interface DegreeRepository : MongoRepository<Degree, String> {

}
