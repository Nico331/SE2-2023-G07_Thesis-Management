package it.polito.server.teacher

import it.polito.server.proposal.Proposal
import org.springframework.data.mongodb.repository.MongoRepository

interface TeacherRepository : MongoRepository<Teacher, String> {


}