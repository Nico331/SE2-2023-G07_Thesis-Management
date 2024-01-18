package it.polito.server
import it.polito.server.appliedproposal.ApplicationStatus
import it.polito.server.appliedproposal.AppliedProposal
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertNotNull

class AppliedProposalTest {

    @Test
    fun toDTOCorrectlyMapsFileNotNull() {
        // Given
        val appliedProposal = AppliedProposal(
            id = "1",
            proposalId = "proposalId",
            studentId = "studentId",
            status = ApplicationStatus.PENDING,
            file = ByteArray(10) // Mock file content
        )

        // When
        val dto = appliedProposal.toDTO()

        // Then
        assertEquals(appliedProposal.id, dto.id)
        assertEquals(appliedProposal.proposalId, dto.proposalId)
        assertEquals(appliedProposal.studentId, dto.studentId)
        assertEquals(appliedProposal.status, dto.status)
        assertNotNull(dto.file)
        assertEquals("application_attachment_studentId", dto.file?.name)
    }

    @Test
    fun toDTOMapsFieldsFileIsNull() {
        // Given
        val appliedProposal = AppliedProposal(
            id = "1",
            proposalId = "proposalId",
            studentId = "studentId",
            status = ApplicationStatus.PENDING,
            file = null
        )

        // When
        val dto = appliedProposal.toDTO()

        // Then
        assertEquals(appliedProposal.id, dto.id)
        assertEquals(appliedProposal.proposalId, dto.proposalId)
        assertEquals(appliedProposal.studentId, dto.studentId)
        assertEquals(appliedProposal.status, dto.status)
        assertNull(dto.file)
    }
}
