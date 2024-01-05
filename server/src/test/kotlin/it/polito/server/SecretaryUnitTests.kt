package it.polito.serve

import it.polito.server.requestproposal.RequestProposalDTO
import it.polito.server.secretary.Secretary
import it.polito.server.secretary.SecretaryController
import it.polito.server.secretary.SecretaryDTO
import it.polito.server.secretary.SecretaryService
import it.polito.server.student.StudentService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.time.LocalDate
import java.util.Optional

class SecretaryUnitTests {

    private lateinit var secretaryService: SecretaryService
    private lateinit var secretaryController: SecretaryController

    @BeforeEach
    fun setUp() {
        secretaryService = mock(SecretaryService::class.java)
        secretaryController = SecretaryController(secretaryService)
    }

    /*@Test
    fun testCreateSecretary() {
        val newSecretary = Secretary(
                name = "name",
                surname = "surname",
                email = "email"
        )

        `when`(secretaryService.createSecretary(newSecretary)).thenReturn(ResponseEntity(newSecretary, HttpStatus.CREATED))

        val responseEntity = secretaryController.createSecretary(newSecretary)

        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == newSecretary)

    }*/

    /*@Test
    fun testUpdateSecretary() {
        val secretaryId = "1"
        val updatedSecretaryDTO = SecretaryDTO(
                name = "name",
                surname = "surname",
                email = "email"
        )

        `when`(secretaryService.updateSecretary(secretaryId, updatedSecretaryDTO)).thenReturn(updatedSecretaryDTO)

        val responseEntity = secretaryController.updateSecretary(secretaryId, updatedSecretaryDTO)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == updatedSecretaryDTO)
    }*/

    /*@Test
    fun testUpdateSecretaryNotFound() {
        val nonExistingSecretaryId = "99"
        val updatedSecretaryDTO = SecretaryDTO(
                name = "name",
                surname = "surname",
                email = "email"
        )

        `when`(secretaryService.updateSecretary(nonExistingSecretaryId, updatedSecretaryDTO)).thenReturn(null)

        val responseEntity = secretaryController.updateSecretary(nonExistingSecretaryId, updatedSecretaryDTO)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }*/

    /*@Test
    fun testDeleteSecretary() {
        val secretaryId = "1"

        `when`(secretaryService.deleteSecretary(secretaryId)).thenReturn(ResponseEntity.status(HttpStatus.OK).body("Secretary with ID $secretaryId successfully deleted."))

        val responseEntity = secretaryController.deleteSecretary(secretaryId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Secretary with ID $secretaryId successfully deleted.")
    }*/

    /*@Test
    fun testDeleteNonExistingSecretary() {
        val nonExistingSecretaryId = "99"

        `when`(secretaryService.deleteSecretary(nonExistingSecretaryId)).thenReturn(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Secretary doesn't exists"))

        val responseEntity = secretaryController.deleteSecretary(nonExistingSecretaryId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "Secretary doesn't exists")
    }*/

    @Test
    fun testGetSecretary() {
        val secretaryId = "1"
        val secretaryDTO = SecretaryDTO(
                name = "name",
                surname = "surname",
                email = "email"
        )

        `when`(secretaryService.findSecretaryById(secretaryId)).thenReturn(secretaryDTO)

        val responseEntity = secretaryController.getSecretary(secretaryId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == secretaryDTO)
    }

    @Test
    fun testGetSecretaryNotFound() {
        val nonExistingSecretaryId = "99"

        `when`(secretaryService.findSecretaryById(nonExistingSecretaryId)).thenReturn(null)

        val responseEntity = secretaryController.getSecretary(nonExistingSecretaryId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testGetAllSecretaries() {
        val secretaryDTOList = listOf(
                SecretaryDTO(
                        id = "1",
                        name = "name1",
                        surname = "surname",
                        email = "email"
                ),
                SecretaryDTO(
                        id = "2",
                        name = "name2",
                        surname = "surname",
                        email = "email"
                )
        )

        `when`(secretaryService.findAllSecretaries()).thenReturn(secretaryDTOList)

        val responseEntity = secretaryController.getAllSecretary()

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == secretaryDTOList)
    }

    @Test
    fun testGetAllSecretariesEmptyList() {
        val emptyList: List<SecretaryDTO> = emptyList()

        `when`(secretaryService.findAllSecretaries())
                .thenReturn(emptyList)

        val responseEntity = secretaryController.getAllSecretary()

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == emptyList)
    }

}