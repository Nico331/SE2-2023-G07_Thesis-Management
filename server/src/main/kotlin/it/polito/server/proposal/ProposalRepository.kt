package it.polito.server.proposal

import it.polito.server.student.Student
import org.springframework.data.mongodb.repository.MongoRepository

interface ProposalRepository : MongoRepository<Proposal, String> {


}