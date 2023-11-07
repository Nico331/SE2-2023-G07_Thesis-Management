package it.polito.server.teacher

import it.polito.server.proposal.ProposalService
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.Date

@RestController
@RequestMapping("/API/teachers")
class TeacherController (private val teacherService: TeacherService){


}