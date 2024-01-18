package it.polito.server.forum

import org.springframework.data.mongodb.repository.MongoRepository

interface ForumRepository : MongoRepository<Forum, String> {
    fun findByVisibility(visibility: ForumVisibility): List<Forum>

}
