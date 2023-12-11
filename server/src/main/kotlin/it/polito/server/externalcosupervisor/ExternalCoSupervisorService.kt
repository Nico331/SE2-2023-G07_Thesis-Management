package it.polito.server.externalcosupervisor

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

}
