package it.polito.server.forum

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface ForumRepository : MongoRepository<Forum, String> {
    fun findByVisibility(visibility: ForumVisibility): List<Forum>

    @Query("{ \$or: [ { 'thesis.studentId': ?0 }, { 'thesis.supervisorId': ?0 }, { 'thesis.coSupervisors': ?0 } ] }")
    fun findForumsByUserAccess(userId: String): List<Forum>
}
