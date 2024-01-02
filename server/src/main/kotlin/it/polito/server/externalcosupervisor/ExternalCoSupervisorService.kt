package it.polito.server.externalcosupervisor

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class ExternalCoSupervisorService (
    private val externalCoSupervisorRepository: ExternalCoSupervisorRepository,
) {
    fun saveNewExternals(externalList: List<ExternalCoSupervisorDTO>) {
        for (external in externalList) {
            if (!externalCoSupervisorRepository.existsByEmail(external.email))
                externalCoSupervisorRepository.save(external.toDBObj())
        }
    }

    fun deleteExternals(email : String ) : ResponseEntity<Any> {
        //check if External CoSupervisor exists and return NOT_FOUND
        if (!externalCoSupervisorRepository.existsByEmail(email))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this External CoSupervisor does NOT EXIST")

        val externalCoSupervisor = externalCoSupervisorRepository.findByEmail(email)
        externalCoSupervisorRepository.delete(externalCoSupervisor)
        return ResponseEntity.status(HttpStatus.OK).body("External CoSupervisor with EMAIL ${externalCoSupervisor.email} successfully deleted.")
    }

}
