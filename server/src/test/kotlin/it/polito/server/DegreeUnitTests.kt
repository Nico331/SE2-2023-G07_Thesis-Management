package it.polito.server

import it.polito.server.annotations.CoderseeGenerated
import it.polito.server.degree.Degree
import it.polito.server.degree.DegreeController
import it.polito.server.degree.DegreeDTO
import it.polito.server.degree.DegreeService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
@CoderseeGenerated
class DegreeControllerTest {

    private lateinit var degreeService: DegreeService
    private lateinit var degreeController: DegreeController

    @BeforeEach
    fun setUp() {
        degreeService = mock(DegreeService::class.java)
        degreeController = DegreeController(degreeService)
    }

    @Test
    fun testCreateDegree() {
        val degree = Degree(
                codDegree = "D1",
                titleDegree = "Degree 1"
        )
        val degreeDTO = DegreeDTO(
                id = "1",
                codDegree = "D1",
                titleDegree = "Degree 1"
        )
        `when`(degreeService.createDegree(degree)).thenReturn(degreeDTO)

        val responseEntity = degreeController.createDegree(degree)

        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == degreeDTO)
    }

    @Test
    fun testGetDegree() {
        val degreeId = "1"
        val degreeDTO = DegreeDTO(
                id = degreeId,
                codDegree = "D1",
                titleDegree = "Degree 1"
        )
        `when`(degreeService.findDegreeById(degreeId)).thenReturn(degreeDTO)

        val responseEntity = degreeController.getDegree(degreeId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == degreeDTO)
    }

    @Test
    fun testGetDegreeNotFound() {
        val nonExistingDegreeId = "99"
        `when`(degreeService.findDegreeById(nonExistingDegreeId)).thenReturn(null)

        val responseEntity = degreeController.getDegree(nonExistingDegreeId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testAllDegree() {
        val degreeDTOList = listOf(
                DegreeDTO(
                        id = "1",
                        codDegree = "D1",
                        titleDegree = "Degree 1"
                ),
                DegreeDTO(
                        id = "2",
                        codDegree = "D2",
                        titleDegree = "Degree 2"
                )
        )
        `when`(degreeService.allDegrees()).thenReturn(degreeDTOList)

        val responseEntityList = degreeController.allDegree()

        assert(responseEntityList == degreeDTOList)
    }

    @Test
    fun testAllDegreeEmptyList() {
        val emptyList: List<DegreeDTO> = emptyList()

        `when`(degreeService.allDegrees())
                .thenReturn(emptyList)

        val responseEntity = degreeController.allDegree()

        assert(responseEntity == emptyList)
    }

    @Test
    fun testUpdateDegree() {
        val degreeId = "1"
        val updatedDegreeDTO = DegreeDTO(
                codDegree = "D1",
                titleDegree = "Updated Degree 1"
        )
        `when`(degreeService.updateDegree(degreeId, updatedDegreeDTO)).thenReturn(
                DegreeDTO(
                        id = degreeId,
                        codDegree = "D1",
                        titleDegree = "Updated Degree 1"
                )
        )

        val responseEntity = degreeController.updateDegree(degreeId, updatedDegreeDTO)

        assert(responseEntity.statusCode == HttpStatus.OK)
    }

    @Test
    fun testUpdateDegreeNotFound() {
        val nonExistingDegreeId = "99"
        val updatedDegreeDTO = DegreeDTO(
                codDegree = "D1",
                titleDegree = "Updated Degree 1"
        )
        `when`(degreeService.updateDegree(nonExistingDegreeId, updatedDegreeDTO)).thenReturn(null)

        val responseEntity = degreeController.updateDegree(nonExistingDegreeId, updatedDegreeDTO)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testDeleteDegree() {
        val degreeId = "1"
        `when`(degreeService.deleteDegree(degreeId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body("Degree with ID $degreeId successfully deleted.")
        )

        val responseEntity = degreeController.deleteDegree(degreeId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Degree with ID $degreeId successfully deleted.")
    }

    @Test
    fun testDeleteNonExistingDegree() {
        val nonExistingDegreeId = "99"
        `when`(degreeService.deleteDegree(nonExistingDegreeId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("This degree does NOT EXIST")
        )

        val responseEntity = degreeController.deleteDegree(nonExistingDegreeId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "This degree does NOT EXIST")
    }

    @Test
    fun testDeleteDegreeError() {
        val degreeId = "1"
        `when`(degreeService.deleteDegree(degreeId)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting degree")
        )
        val responseEntity = degreeController.deleteDegree(degreeId)
        // Verifico che la risposta sia INTERNAL_SERVER_ERROR
        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Error deleting degree")
    }
}
