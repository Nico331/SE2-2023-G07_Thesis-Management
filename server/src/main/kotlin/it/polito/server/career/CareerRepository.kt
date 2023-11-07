package it.polito.server.career

import org.springframework.data.mongodb.repository.MongoRepository

interface CareerRepository : MongoRepository<Career, String> {
}