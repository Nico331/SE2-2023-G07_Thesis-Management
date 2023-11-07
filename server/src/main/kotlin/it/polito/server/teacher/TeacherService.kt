package it.polito.server.teacher

import it.polito.server.proposal.ProposalRepository
import org.springframework.stereotype.Service
import java.util.*
import kotlin.reflect.full.declaredMemberProperties

@Service
class TeacherService (private val teacherRepository : TeacherRepository) {
}