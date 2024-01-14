package it.polito.server.appliedproposal

import it.polito.server.career.CareerDTO
import it.polito.server.proposal.archiviation_type
import java.time.LocalDate

data class AppliedProposalDTO (
    val id: String? = null,
    val proposalId: String,
    val studentId: String,
    var status: ApplicationStatus,
    val file: FileDTO?
)

fun AppliedProposalDTO.toDocument(): AppliedProposal{
        return AppliedProposal(id, proposalId, studentId, status, file?.content )
}

data class FileDTO(
        val content: ByteArray,
        val name: String,
        val originalFilename: String,
        val contentType: String
) {
        override fun equals(other: Any?): Boolean {
                if (this === other) return true
                if (javaClass != other?.javaClass) return false

                other as FileDTO

                if (!content.contentEquals(other.content)) return false
                if (name != other.name) return false
                if (originalFilename != other.originalFilename) return false
                if (contentType != other.contentType) return false

                return true
        }

        override fun hashCode(): Int {
                var result = content.contentHashCode()
                result = 31 * result + name.hashCode()
                result = 31 * result + originalFilename.hashCode()
                result = 31 * result + contentType.hashCode()
                return result
        }
}

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
        val status: ApplicationStatus,
        val file: FileDTO?
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
