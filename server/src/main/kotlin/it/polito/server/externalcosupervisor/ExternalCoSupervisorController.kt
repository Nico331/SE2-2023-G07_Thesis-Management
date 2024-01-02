package it.polito.server.externalcosupervisor

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/API/external")
class ExternalCoSupervisorController(private val externalCoSupervisorService: ExternalCoSupervisorService){

    @DeleteMapping("/{email}")
    fun deleteExternal(@PathVariable email : String): ResponseEntity<Any> {
        return externalCoSupervisorService.deleteExternals(email)
    }
}
