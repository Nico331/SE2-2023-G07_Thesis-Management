package it.polito.server.courses

import org.springframework.data.mongodb.repository.MongoRepository

interface CourseRepository : MongoRepository<Course, String> {

}
