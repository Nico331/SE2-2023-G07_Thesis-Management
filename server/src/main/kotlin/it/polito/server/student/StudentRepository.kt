package it.polito.server.student

import org.springframework.data.mongodb.repository.MongoRepository

interface StudentRepository : MongoRepository<Student, String> {
    fun findByEmail(email: String): Student?
}