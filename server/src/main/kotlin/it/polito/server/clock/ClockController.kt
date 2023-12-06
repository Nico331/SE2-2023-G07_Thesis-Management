package it.polito.server.clock

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException


@RestController
@RequestMapping("/API/virtualclock")
class ClockController (private val clockService: ClockService) {

    @PutMapping("/set/{dateTimeToSet}")
    fun setServerVirtualCLock ( @PathVariable dateTimeToSet : String ) : ResponseEntity<Any> {
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
        val localDateTime : LocalDateTime

        try {
            localDateTime = LocalDateTime.parse(dateTimeToSet, formatter)
        }
        catch (e : DateTimeParseException ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Date and time not correctly formatted. Ensure it is formatted like \"yyyy-MM-dd'T'HH:mm:ss\" ")
        }

        clockService.setServerVirtualClock( localDateTime )
        return ResponseEntity.status(HttpStatus.OK).body("Virtual clock set. Do refresh to visualize updates.")
    }

    @PutMapping("/reset")
    fun resetServerVirtualCLock() : ResponseEntity<Any> {
        clockService.unsetServerVirtualClock()
        return ResponseEntity.status(HttpStatus.OK).body("Virtual clock resetted. Do refresh to visualize updates.")
    }

    @GetMapping("getServerClock")
    fun getServerClock () : ResponseEntity<LocalDateTime> {
        return ResponseEntity.status(HttpStatus.OK).body(clockService.getServerClock())

    }

}