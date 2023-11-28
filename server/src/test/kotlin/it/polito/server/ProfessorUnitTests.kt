package it.polito.server

import it.polito.server.professor.Professor
import it.polito.server.professor.ProfessorController
import it.polito.server.professor.ProfessorDTO
import it.polito.server.professor.ProfessorService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import java.util.*

class ProfessorUnitTests {

    private lateinit var professorService: ProfessorService
    private lateinit var professorController: ProfessorController

    @BeforeEach
    fun setUp() {
        professorService = mock(ProfessorService::class.java)
        professorController = ProfessorController(professorService)
    }

    @Test
    fun testGetProfessor() {
        val professorId = "1"
        val professorDTO = ProfessorDTO(
                id = professorId,
                name = "John",
                surname = "Doe",
                email = "johndoe@professor.it",
                codGroup = "Group",
                codDepartment = "Department"
        )
        // Configuro il mock del servizio che ritorna lo professorDTO
        `when`(professorService.findProfessorById(professorId)).thenReturn(professorDTO)
        // Eseguo la chiamata all'API GETPROFESSOR
        val responseEntity = professorController.getProfessor(professorId)
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == professorDTO)
    }

    @Test
    fun testGetProfessorNotFound() {
        val professorId = "2"
        // Configuro il mock del servizio per indicare NULL
        `when`(professorService.findProfessorById(professorId)).thenReturn(null)
        // Eseguo la chiamata all'API GETPROFESSOR
        val responseEntity = professorController.getProfessor(professorId)
        // Verifico che la risposta sia NOT_FOUND
        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testAllProfessors() {
        val professorDTOList = listOf(
                ProfessorDTO(
                        id = "1",
                        name = "John",
                        surname = "Doe",
                        email = "johndoe@professor.it",
                        codGroup = "Group",
                        codDepartment = "Department"
                ),
                ProfessorDTO(
                        id = "2",
                        name = "Alex",
                        surname = "Red",
                        email = "alexred@professor.it",
                        codGroup = "Group",
                        codDepartment = "Department"
                )
        )
        // Configuro il mock del servizio per indicare la LISTA di professorDTO
        `when`(professorService.allProfessors()).thenReturn(professorDTOList)
        // Eseguo la chiamata all'API ALLPROFESSORS
        val responseEntityList = professorController.allProfessors()
        // Verifico che la risposta sia la LISTA di professorDTO
        assert(responseEntityList == professorDTOList)
    }

    @Test
    fun testCreateProfessor() {
        val newProfessor = Professor(
                name = "New",
                surname = "Professor",
                email = "newprofessor@professor.it",
                codGroup = "Group",
                codDepartment = "Department"
        )
        // Configuro il mock del servizio per indicare NewProfessor + CREATED
        `when`(professorService.createProfessor(newProfessor)).thenReturn(
                ResponseEntity(newProfessor, HttpStatus.CREATED)
        )
        // Eseguo la chiamata all'API CREATEPROFESSOR
        val responseEntity = professorController.createProfessor(newProfessor)
        // Verifico che la risposta sia CREATED
        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == newProfessor)
    }

    @Test
    fun testCreateExistingProfessor() {
        val existingProfessor = Professor(
                name = "Existing",
                surname = "Professor",
                email = "existingprofessor@professor.it",
                codGroup = "Group",
                codDepartment = "Department"
        )
        // Configuro il mock del servizio per indicare BAD_REQUEST
        `when`(professorService.createProfessor(existingProfessor)).thenReturn(ResponseEntity.status(HttpStatus.BAD_REQUEST).body("existing professor"))
        // Eseguo la chiamata all'API CREATEPROFESSOR
        val responseEntity = professorController.createProfessor(existingProfessor)
        // Verifico che la risposta sia BAD_REQUEST
        assert(responseEntity.statusCode == HttpStatus.BAD_REQUEST)
        assert(responseEntity.body == "existing professor")
    }

    @Test
    fun testCreateProfessorError() {
        val newProfessor = Professor(
                name = "New",
                surname = "Professor",
                email = "newprofessor@professor.it",
                codGroup = "Group",
                codDepartment = "Department"
        )
        // Configuro il mock del servizio per indicare un errore durante la creazione del PROFESSORE
        `when`(professorService.createProfessor(newProfessor)).thenReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating professor"))
        // Eseguo la chiamata all'API CREATEPROFESSOR
        val responseEntity = professorController.createProfessor(newProfessor)
        // Verifico che la risposta sia INTERNAL_SERVER_ERROR
        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Error creating professor")
    }

    @Test
    fun testUpdateProfessor() {
        val professorId = "1"
        val updatedProfessorDTO = ProfessorDTO(
                name = "Updated",
                surname = "Professor",
                email = "updatedprofessor@professor.it",
                codGroup = "Group",
                codDepartment = "Department"
        )
        // Configuro il mock del servizio che ritorna professoDTO
        `when`(professorService.updateProfessor(professorId, updatedProfessorDTO)).thenReturn(
                ProfessorDTO(
                        id = professorId,
                        name = "Updated",
                        surname = "Professor",
                        email = "updated.professor@example.com",
                        codGroup = "Group",
                        codDepartment = "Department"
                )
        )
        // Eseguo la chiamata all'API UPDATPROFESSOR
        val responseEntity = professorController.updateProfessor(professorId, updatedProfessorDTO)
        // Verifico che la risposta sia OK
        assert(responseEntity.statusCode == HttpStatus.OK)
    }

    @Test
    fun testDeleteExistingProfessor() {
        val professorId = "1"
        // Configuro il mock del servizio per indicare che il professore esiste
        `when`(professorService.deleteProfessor(professorId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body("Professor with ID $professorId successfully deleted.")
        )
        // Esegui la chiamata all'API DELETE
        val responseEntity = professorController.deleteProfessor(professorId)
        // Verifica che la risposta sia OK
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Professor with ID $professorId successfully deleted.")
    }

    @Test
    fun testDeleteNonExistingProfessor() {
        val nonExistingProfessorId = "99"
        // Configura il mock del servizio per indicare che il professore non esiste
        `when`(professorService.deleteProfessor(nonExistingProfessorId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("This professor does NOT EXIST")
        )
        // Esegui la chiamata all'API DELETE
        val responseEntity = professorController.deleteProfessor(nonExistingProfessorId)
        // Verifica che la risposta sia NOT_FOUND
        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "This professor does NOT EXIST")
    }

    @Test
    fun testDeleteProfessorError() {
        val professorId = "1"
        // Configuro il mock del servizio per indicare un errore durante l'eliminazione del professore
        `when`(professorService.deleteProfessor(professorId)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting professor")
        )
        // Eseguo la chiamata all'API DELETE
        val responseEntity = professorController.deleteProfessor(professorId)
        // Verifico che la risposta sia INTERNAL_SERVER_ERROR
        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Error deleting professor")
    }
}