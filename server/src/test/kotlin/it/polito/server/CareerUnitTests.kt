package it.polito.server

import it.polito.server.annotations.CoderseeGenerated
import it.polito.server.career.Career
import it.polito.server.career.CareerController
import it.polito.server.career.CareerDTO
import it.polito.server.career.CareerService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.BeforeEach
import org.mockito.Mockito.*
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
@CoderseeGenerated
class CareerControllerTest {

    private lateinit var careerService: CareerService
    private lateinit var careerController: CareerController

    @BeforeEach
    fun setUp() {
        careerService = mock(CareerService::class.java)
        careerController = CareerController(careerService)
    }

    @Test
    fun testCreateCareer() {
        val career = Career(
                studentId = "1",
                codCourse = "C1",
                titleCourse = "Course 1",
                cfu = 6,
                grade = 30,
                date = "2023-01-01"
        )
        val careerDTO = CareerDTO(
                id = "1",
                studentId = "1",
                codCourse = "C1",
                titleCourse = "Course 1",
                cfu = 6,
                grade = 30,
                date = "2023-01-01"
        )
        `when`(careerService.createCareer(career)).thenReturn(careerDTO)

        val responseEntity = careerController.createCareer(career)

        assert(responseEntity.statusCode == HttpStatus.CREATED)
        assert(responseEntity.body == careerDTO)
    }

    @Test
    fun testGetCareer() {
        val careerId = "1"
        val careerDTO = CareerDTO(
                id = careerId,
                studentId = "1",
                codCourse = "C1",
                titleCourse = "Course 1",
                cfu = 6,
                grade = 30,
                date = "2023-01-01"
        )
        `when`(careerService.findCareerById(careerId)).thenReturn(careerDTO)

        val responseEntity = careerController.getCareer(careerId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == careerDTO)
    }

    @Test
    fun testGetCareerNotFound() {
        val nonExistingCareerId = "99"
        `when`(careerService.findCareerById(nonExistingCareerId)).thenReturn(null)

        val responseEntity = careerController.getCareer(nonExistingCareerId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testAllCareer() {
        val careerDTOList = listOf(
                CareerDTO(
                        id = "1",
                        studentId = "1",
                        codCourse = "C1",
                        titleCourse = "Course 1",
                        cfu = 6,
                        grade = 30,
                        date = "2023-01-01"
                ),
                CareerDTO(
                        id = "2",
                        studentId = "1",
                        codCourse = "C2",
                        titleCourse = "Course 2",
                        cfu = 6,
                        grade = 28,
                        date = "2023-02-01"
                )
        )
        `when`(careerService.allCareers()).thenReturn(careerDTOList)

        val responseEntityList = careerController.allCareer()

        assert(responseEntityList == careerDTOList)
    }

    @Test
    fun testAllCareerEmptyList() {
        val emptyList: List<CareerDTO> = emptyList()

        `when`(careerService.allCareers())
                .thenReturn(emptyList)

        val responseEntity = careerController.allCareer()

        assert(responseEntity == emptyList)
    }

    @Test
    fun testUpdateCareer() {
        val careerId = "1"
        val updatedCareerDTO = CareerDTO(
                studentId = "1",
                codCourse = "C1",
                titleCourse = "Updated Course 1",
                cfu = 6,
                grade = 32,
                date = "2023-01-15"
        )
        `when`(careerService.updateCareer(careerId, updatedCareerDTO)).thenReturn(
                CareerDTO(
                        id = careerId,
                        studentId = "1",
                        codCourse = "C1",
                        titleCourse = "Updated Course 1",
                        cfu = 6,
                        grade = 32,
                        date = "2023-01-15"
                )
        )

        val responseEntity = careerController.updateCareer(careerId, updatedCareerDTO)

        assert(responseEntity.statusCode == HttpStatus.OK)
    }

    @Test
    fun testUpdateCareerNotFound() {
        val nonExistingCareerId = "99"
        val updatedCareerDTO = CareerDTO(
                studentId = "1",
                codCourse = "C1",
                titleCourse = "Updated Course 1",
                cfu = 6,
                grade = 32,
                date = "2023-01-15"
        )
        `when`(careerService.updateCareer(nonExistingCareerId, updatedCareerDTO)).thenReturn(null)

        val responseEntity = careerController.updateCareer(nonExistingCareerId, updatedCareerDTO)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
    }

    @Test
    fun testDeleteCareer() {
        val careerId = "1"
        `when`(careerService.deleteCareer(careerId)).thenReturn(
                ResponseEntity.status(HttpStatus.OK).body("Career with ID $careerId successfully deleted.")
        )

        val responseEntity = careerController.deleteCareer(careerId)

        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body == "Career with ID $careerId successfully deleted.")
    }

    @Test
    fun testDeleteNonExistingCareer() {
        val nonExistingCareerId = "99"
        `when`(careerService.deleteCareer(nonExistingCareerId)).thenReturn(
                ResponseEntity.status(HttpStatus.NOT_FOUND).body("This career does NOT EXIST")
        )

        val responseEntity = careerController.deleteCareer(nonExistingCareerId)

        assert(responseEntity.statusCode == HttpStatus.NOT_FOUND)
        assert(responseEntity.body == "This career does NOT EXIST")
    }

    @Test
    fun testDeleteCareerError() {
        val careerId = "1"
        `when`(careerService.deleteCareer(careerId)).thenReturn(
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting career")
        )
        val responseEntity = careerController.deleteCareer(careerId)
        // Verifico che la risposta sia INTERNAL_SERVER_ERROR
        assert(responseEntity.statusCode == HttpStatus.INTERNAL_SERVER_ERROR)
        assert(responseEntity.body == "Error deleting career")
    }
}
