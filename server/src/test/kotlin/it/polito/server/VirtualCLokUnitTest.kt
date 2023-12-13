package it.polito.server

import it.polito.server.clock.ClockController
import it.polito.server.clock.ClockService
import it.polito.server.student.StudentController
import it.polito.server.student.StudentDTO
import it.polito.server.student.StudentService
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import org.springframework.http.HttpStatus
import java.time.LocalDateTime

class VirtualCLokUnitTest {

        private lateinit var clockService: ClockService
        private lateinit var clockController: ClockController

        @BeforeEach
        fun setUp() {
            clockService = Mockito.mock(ClockService::class.java)
            clockController = ClockController(clockService)
        }

    @Test
    fun testSetVirtualCLock() {
        val clockToSet = "2025-01-01T01:01:01"


        // Eseguo la chiamata all'API SetVirtualClock
        val responseEntity = clockController.setServerVirtualCLock(clockToSet)
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body is String)
    }

    @Test
    fun testResetVirtualCLock() {

        // Eseguo la chiamata all'API ResetVirtualClock
        val responseEntity = clockController.resetServerVirtualCLock()
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body is String)
    }

    @Test
    fun testGetVirtualCLock() {

        `when`(clockService.getServerClock()).thenReturn(LocalDateTime.now())

        // Eseguo la chiamata all'API GetVirtualClock
        val responseEntity = clockController.getServerClock()
        // Verifico che la risposta sia OK e anche il BODY
        assert(responseEntity.statusCode == HttpStatus.OK)
        assert(responseEntity.body is LocalDateTime)
    }
}