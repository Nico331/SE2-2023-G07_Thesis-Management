package it.polito.server.forum

import it.polito.server.professor.ProfessorService
import it.polito.server.student.StudentService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/API/forums")
class ForumController(
    private val forumService: ForumService,
    private val studentService: StudentService,
    private val professorService: ProfessorService
) {
    @GetMapping("/{forumId}")
    fun getOneTopic(@PathVariable forumId : String,@AuthenticationPrincipal jwt: Jwt): ResponseEntity<Any> {
        return try {
            val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"
            val realmAccess = jwt.claims["realm_access"] as? Map<String, Any>
            val roles = realmAccess?.get("roles") as? List<String> ?: emptyList()

            val isProfessor = roles.contains("PROFESSOR")
            val forum = forumService.getOneForum(userId, if(isProfessor) UserRole.PROFESSOR else UserRole.STUDENT, forumId)
            ResponseEntity.ok(forum)
        } catch (ex: Exception){
            ResponseEntity.badRequest().build();
        }
    }

    // Get
    @GetMapping
    fun getAllAccessibleForums(@AuthenticationPrincipal jwt: Jwt): ResponseEntity<List<ForumDTO>> {
        val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"
        val realmAccess = jwt.claims["realm_access"] as? Map<String, Any>
        val roles = realmAccess?.get("roles") as? List<String> ?: emptyList()

        val isProfessor = roles.contains("PROFESSOR")
        val forums = forumService.getAccessibleForums(userId, if(isProfessor) UserRole.PROFESSOR else UserRole.STUDENT)
        return ResponseEntity.ok(forums)
    }

    // Create new forum
    @PostMapping("/new")
    fun createForum(@RequestBody forumDTO: ForumDTO, @AuthenticationPrincipal jwt: Jwt): ResponseEntity<Any> {
        val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"
        val realmAccess = jwt.claims["realm_access"] as? Map<String, Any>
        val roles = realmAccess?.get("roles") as? List<String> ?: emptyList()
        val isProfessor = roles.contains("PROFESSOR")
        if( isProfessor ) {
            return forumService.createForum(forumDTO, userId)
        } else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to create this forum.")
    }

    // Delete
    @DeleteMapping("/{forumId}")
    fun deleteForum(@PathVariable forumId: String, @AuthenticationPrincipal jwt: Jwt): ResponseEntity<Void> {
        val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"

        forumService.deleteForum(forumId, userId)
        return ResponseEntity.ok().build()
    }

    // Close
    @PutMapping("/{forumId}/close")
    fun closeForum(@PathVariable forumId: String, @AuthenticationPrincipal jwt: Jwt): ResponseEntity<Any> {
        val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"
        return forumService.closeForum(forumId, userId)
    }

    // Change visibility
    @PutMapping("/{forumId}/visibility")
    fun updateForumVisibility(@PathVariable forumId: String,
                              @RequestParam visibility: ForumVisibility,
                              @AuthenticationPrincipal jwt: Jwt): ResponseEntity<Any> {
        val userId: String = jwt.getClaimAsString("preferred_username").split("@")[0] ?: "Unknown"
        return forumService.updateForumVisibility(forumId, visibility, userId)
    }
}
