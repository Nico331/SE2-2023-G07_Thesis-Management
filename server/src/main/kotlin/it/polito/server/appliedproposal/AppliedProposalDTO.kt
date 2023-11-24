package it.polito.server.appliedproposal

import it.polito.server.career.CareerDTO
import it.polito.server.proposal.archiviation_type
import it.polito.server.student.StudentDTO
import java.time.LocalDate
import java.util.*

data class AppliedProposalDTO (
        val id: String? = null,
        val proposalId: String,
        val studentId: String,
        val status: ApplicationStatus
)

data class StrangeObjectRequestedByDarione (
        val id: String? = null,
        var title: String,
        var supervisor: String,
        var coSupervisors: List<String>,
        var keywords: List<String>,
        var type: String,
        var groups: List<String>,
        var description: String,
        var requiredKnowledge : String,
        var notes : String,
        var expiration : LocalDate,
        var level: String,
        var cdS : List<String>,
        var archived : archiviation_type,
        var applications: List<Applications>
)
data class Applications(
        val id: String? = null,
        val proposalId: String,
        val student: Student,
        val status: ApplicationStatus
)
data class Student(
        val id: String? = null,
        var surname: String,
        var name: String,
        var gender: String,
        var nationality: String,
        var email: String,
        var codDegree: String,
        var enrollmentYear: Int,
        var listExams: List<CareerDTO>
)
