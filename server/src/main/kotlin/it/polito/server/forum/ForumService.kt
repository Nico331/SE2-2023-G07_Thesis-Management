package it.polito.server.forum

import it.polito.server.ForumNotFoundException
import it.polito.server.professor.ProfessorRepository
import it.polito.server.requestproposal.RequestProposalRepository
import it.polito.server.requestproposal.RequestProposalService
import org.springframework.http.HttpEntity
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.sql.Timestamp
import java.time.Instant

@Service
class ForumService(
    private val forumRepository: ForumRepository,
    private val professorRepository: ProfessorRepository,
    private val requestProposalRepository: RequestProposalRepository
    ) {
    fun getOneForum(userId: String, userRole: UserRole, forumId: String): ForumDTO {
        return forumRepository.findById(forumId).get().toDTO()
    }

    fun getAccessibleForums(userId: String, userRole: UserRole): List<ForumDTO> {

        val publicForums = forumRepository.findByVisibility(ForumVisibility.PUBLIC)

        val accessibleForums = mutableListOf<Forum>()
        accessibleForums.addAll(publicForums)
        val protectedForums = forumRepository.findByVisibility(ForumVisibility.PROTECTED)
        if (userRole == UserRole.PROFESSOR) {
            accessibleForums.addAll(protectedForums)
        } else{
            accessibleForums.addAll(protectedForums.filter { forum ->
                requestProposalRepository.findById(forum.thesis).get().let { thesis ->
                    userId == thesis.supervisorId ||
                            userId == thesis.studentId ||
                            thesis.coSupervisors.contains(userId)
                }
            })
        }

        val personalForums = forumRepository.findByVisibility(ForumVisibility.PRIVATE)
        accessibleForums.addAll(protectedForums.filter { forum ->
            requestProposalRepository.findById(forum.thesis).get().let { thesis ->
                userId == thesis.supervisorId ||
                        userId == thesis.studentId ||
                        thesis.coSupervisors.contains(userId)
            }
        })

        return accessibleForums.distinctBy { it.id }
            .sortedByDescending { it.lastMessage }
            .map { it.toDTO() }
    }


    fun createForum(forumDTO: ForumDTO, userId: String): ResponseEntity<Any> {
        val optProfessor = professorRepository.findById(userId)
        return if(optProfessor.isPresent){
            val professor=optProfessor.get()
            val forum = forumDTO.toEntity().copy(
                author = professor,
                closeDate = Instant.now(),
                status = ForumStatus.OPENED
            )
            val savedForum = forumRepository.save(forum)
            ResponseEntity.ok(savedForum.toDTO())
        } else {
            ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to create this forum.")
        }
    }

    fun deleteForum(forumId: String, userId: String): ResponseEntity<Any> {
        val forum = forumRepository.findById(forumId)
        return if(forum.isPresent) {
            if(forum.get().author!!.id==userId){
                forumRepository.deleteById(forumId)
                ResponseEntity.ok().build()
            } else{
                ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to delete this forum.")
            }
        } else {
            throw ForumNotFoundException(forumId)
        }
    }

    fun closeForum(forumId: String, userId: String): ResponseEntity<Any> {
        val optionalForum = forumRepository.findById(forumId)
        if (!optionalForum.isPresent) {
            throw ForumNotFoundException(forumId)
        }
        val forum = optionalForum.get()
        if (forum.author!!.id != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to close this forum.")
        }
        forum.status = ForumStatus.CLOSED
        val updatedForum = forumRepository.save(forum)
        return ResponseEntity.ok(updatedForum.toDTO())
    }


    fun updateForumVisibility(forumId: String, visibility: ForumVisibility, userId: String): ResponseEntity<Any> {
        val forum = forumRepository.findById(forumId).orElseThrow { ForumNotFoundException(forumId) }
        if (forum.author!!.id != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to modify this forum.")
        }
        forum.visibility = visibility
        val updatedForum = forumRepository.save(forum)
        return ResponseEntity.ok(updatedForum.toDTO())
    }
}
