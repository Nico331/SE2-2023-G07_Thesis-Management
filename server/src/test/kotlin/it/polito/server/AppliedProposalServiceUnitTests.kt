package it.polito.server

import it.polito.server.appliedproposal.AppliedProposal
import it.polito.server.appliedproposal.AppliedProposalRepository
import it.polito.server.appliedproposal.AppliedProposalService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.Mock
import org.mockito.InjectMocks
import org.mockito.Mockito.`when`
import org.junit.jupiter.api.Assertions.assertEquals
import org.mockito.Mockito.any
import java.util.*

@ExtendWith(MockitoExtension::class)
class AppliedProposalServiceTest {

    @Mock
    private lateinit var appliedProposalRepository: AppliedProposalRepository

    @InjectMocks
    private lateinit var appliedProposalService: AppliedProposalService
    private val appliedProposal1 = AppliedProposal(

            proposalId = "11111",
            studentId = "12345",
            file = null
    )

    private val appliedProposal2 = AppliedProposal(

            proposalId = "22222",
            studentId = "67890",
            file = null
    )
    private val appliedProposals = listOf(
        appliedProposal1, appliedProposal2
    )

    @Test
    fun `findAll returns all applied proposals as DTOs`() {
        // Given

        val appliedProposalDTOs = appliedProposals.map { it.toDTO() }
        `when`(appliedProposalRepository.findAll()).thenReturn(appliedProposals)

        // When
        val result = appliedProposalService.findAll()

        // Then
        assertEquals(appliedProposalDTOs.size, result.size)
        assertEquals(appliedProposalDTOs, result)
    }
}
