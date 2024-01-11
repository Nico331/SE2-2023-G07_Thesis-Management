package it.polito.server.proposal

import it.polito.server.appliedproposal.ApplicationStatus
import it.polito.server.appliedproposal.AppliedProposalRepository
import it.polito.server.email.EmailService
import it.polito.server.externalcosupervisor.ExternalCoSupervisorRepository
import it.polito.server.externalcosupervisor.ExternalCoSupervisorService
import it.polito.server.professor.ProfessorService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.net.URLDecoder
import java.nio.charset.StandardCharsets
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.util.regex.Pattern

@Service
class ProposalService (
    private val proposalRepository : ProposalRepository,
    private val professorService: ProfessorService,
    private val appliedProposalRepository: AppliedProposalRepository,
    private val externalCoSupervisorRepository: ExternalCoSupervisorRepository,
    private val externalCoSupervisorService: ExternalCoSupervisorService,
    private val emailService: EmailService
    ) {

    fun updateProposal(id: String, update: ProposalDTO): ProposalDTO? {
        val existingProposal = proposalRepository.findById(id).orElse(null)?.toDTO(externalCoSupervisorRepository)
            ?: return null
        // notify
        val existingCoSupervisors = existingProposal.coSupervisors.toSet()
        val updatedCoSupervisors = update.coSupervisors.toSet()
        val removedCoSupervisors = existingCoSupervisors.subtract(updatedCoSupervisors)
        val addedCoSupervisors = updatedCoSupervisors.subtract(existingCoSupervisors)

        removedCoSupervisors.forEach { coSupervisor ->
            CoroutineScope(Dispatchers.IO).launch {
                emailService.notifyRemovedCoSupervisor(
                    update.title,
                    professorService.findProfessorById(coSupervisor)!!.email
                )
            }
        }

        addedCoSupervisors.forEach { coSupervisor ->
            CoroutineScope(Dispatchers.IO).launch {
                emailService.notifyAddedCoSupervisor(update.title, professorService.findProfessorById(coSupervisor)!!.email)
            }
        }

        var existingExternalCoSupervisors = existingProposal.externalCoSupervisors?.toSet()
        var updatedExternalCoSupervisors = update.externalCoSupervisors?.toSet()
        if(existingExternalCoSupervisors!=null || updatedExternalCoSupervisors!=null){

            if(updatedExternalCoSupervisors==null ){
                updatedExternalCoSupervisors = setOf()
            } else if(existingExternalCoSupervisors == null){
                existingExternalCoSupervisors = setOf()
            }
            val addedExternalCoSupervisors = updatedExternalCoSupervisors.subtract(existingExternalCoSupervisors!!)
            val removedExternalCoSupervisors = existingExternalCoSupervisors.subtract(updatedExternalCoSupervisors)

            removedExternalCoSupervisors.forEach { externalCoSupervisor ->
                CoroutineScope(Dispatchers.IO).launch {
                    emailService.notifyRemovedCoSupervisor(update.title, externalCoSupervisor.email)
                }
            }

            addedExternalCoSupervisors.forEach { externalCoSupervisor ->
                CoroutineScope(Dispatchers.IO).launch {
                    emailService.notifyAddedCoSupervisor(update.title, externalCoSupervisor.email)
                }
            }
        }
        // end notify
        val external = update.externalCoSupervisors
        if (external != null)
            externalCoSupervisorService.saveNewExternals(external)
        return proposalRepository.save(update.copy(archived =
        if(update.expiration.isAfter(LocalDate.now()))
            archiviation_type.NOT_ARCHIVED
        else
            archiviation_type.EXPIRED
        ).toDBObj()).toDTO(externalCoSupervisorRepository)
    }

    fun createProposal(proposal: ProposalDTO): ProposalDTO {
        val external = proposal.externalCoSupervisors
        if (external != null)
            externalCoSupervisorService.saveNewExternals(external)
        // notify
        proposal.coSupervisors.forEach { coSupervisor ->
            CoroutineScope(Dispatchers.IO).launch {
                emailService.notifyAddedCoSupervisor(
                    proposal.title,
                    professorService.findProfessorById(coSupervisor)!!.email
                )
            }
        }
        proposal.externalCoSupervisors?.forEach { externalCoSup ->
            CoroutineScope(Dispatchers.IO).launch {
                emailService.notifyAddedCoSupervisor(proposal.title, externalCoSup.email)
            }
        }
        // end notify
        val savedProposal = proposalRepository.save(proposal.toDBObj())
        return savedProposal.toDTO(externalCoSupervisorRepository)
    }

    fun findProposalById(id: String): ProposalDTO? {
        return proposalRepository.findById(id).map { it.toDTO(externalCoSupervisorRepository) }.orElse(null)
    }
    fun findAll() : List<ProposalDTO> {
        //println(proposalRepository.findByArchived(archiviation_type.NOT_ARCHIVED).map{(it.toDTO())})
        //println(proposalRepository.findAll().map{(it.toDTO())})
        //return proposalRepository.findByArchived(archiviation_type.NOT_ARCHIVED).map{(it.toDTO())}
        return proposalRepository.findAll().map{(it.toDTO(externalCoSupervisorRepository))}
    }

    fun findActiveByStudent( studentId : String): List<ProposalDTO>? {
        val activeProposals = proposalRepository.findByArchived( archiviation_type.NOT_ARCHIVED )
        val filteredProposals = activeProposals.filter { appliedProposalRepository.findByProposalIdAndStudentId( it.id!!, studentId) != null }
        return filteredProposals.map { it.toDTO(externalCoSupervisorRepository) }
    }

    fun deleteProposal(id: String) : ResponseEntity<Any> {
        if (!proposalRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proposal doesn't exists")

        val proposal = proposalRepository.findById(id).get()
        // notify
        proposal.coSupervisors.forEach { coSupervisor ->
            CoroutineScope(Dispatchers.IO).launch {
                emailService.notifyRemovedCoSupervisor(
                    proposal.title,
                    professorService.findProfessorById(coSupervisor)!!.email
                )
            }
        }
        proposal.toDTO(externalCoSupervisorRepository).externalCoSupervisors?.forEach { external ->
            CoroutineScope(Dispatchers.IO).launch {
                emailService.notifyRemovedCoSupervisor(proposal.title, external.email)
            }
        }
        // end notify
        if(proposal.archived == archiviation_type.MANUALLY_ARCHIVED || proposal.archived == archiviation_type.EXPIRED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Proposal is already archived")

        proposalRepository.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    fun findActiveProposalsBySupervisor(supervisor:String): ResponseEntity<Any> {

        //Check if the supervisor exists
        professorService.findProfessorById(supervisor)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Supervisor '$supervisor' does NOT exist.")

        //Check if the supervisor has any proposals
        val allProposals = proposalRepository.findBySupervisor(supervisor)
        if(allProposals.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Supervisor '$supervisor' has NO proposals.")

        //Check if the supervisor has any active proposals
        val activeProposals = allProposals.filter { it.archived==archiviation_type.NOT_ARCHIVED }
        if(activeProposals.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Supervisor '$supervisor' has NO ACTIVE proposals.")

        val activeProposalsDTOs = activeProposals.map { it.toDTO(externalCoSupervisorRepository) }
        return ResponseEntity.ok(activeProposalsDTOs)
    }

    fun manuallyArchivedProposal(id: String) : ResponseEntity <Any>
    {
        //check if the proposal exists
        val proposal = proposalRepository.findById(id)
        if(proposal.isEmpty)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Proposal '$id' not found")

        //check if it has already been archived
        val proposalEntity = proposal.get()
        if(proposalEntity.archived == archiviation_type.MANUALLY_ARCHIVED){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Proposal is already archived")
        }

        //set to MANUALLY_ARCHIVED and save
        proposalRepository.save(proposalEntity.copy(archived = archiviation_type.MANUALLY_ARCHIVED))

        //REJECT ALL PENDING APPLICATIONS
        val applications = appliedProposalRepository.findByProposalId(id)
        applications.forEach { application ->
            if (application.status == ApplicationStatus.PENDING) {
                appliedProposalRepository.save(application.copy(status = ApplicationStatus.CANCELLED))
            }
        }

        return ResponseEntity.ok("Proposal '$id' archived manually successfully")
    }
    fun findProposalBySupervisor(supervisor: String): List<ProposalDTO> {
        return proposalRepository.findBySupervisor(supervisor).map { it.toDTO(externalCoSupervisorRepository) }
    }

    fun existsByTitleAndSupervisor(proposalTitle: String, proposalSupervisor: String): Boolean {
        return proposalRepository.existsProposalByTitleAndSupervisor(proposalTitle, proposalSupervisor)
    }

    @Autowired
    private lateinit var mongoTemplate: MongoTemplate

    fun getProposalsWithFilters(filters: Map<String, String>, searchKeyword: String?): List<ProposalDTO> {
        val query = Query()
        filters.forEach { (key, value) ->
            val decodedValue = URLDecoder.decode(value, StandardCharsets.UTF_8.toString())
            when (key) {
                "search" -> {}
                "archived" -> query.addCriteria(Criteria.where(key).`is`(decodedValue.toBoolean()))
                "cdS", "supervisor","type","groups", "level", "keywords" -> {
                    val cdSList = decodedValue.split(",").map { it.trim() }
                    query.addCriteria(Criteria.where(key).`in`(cdSList))
                }
                "expiration" -> {
                    val formatter = SimpleDateFormat("yyyy-MM-dd")
                    val date = formatter.parse(decodedValue)
                    query.addCriteria(Criteria.where(key).gte(date))
                }
                else -> query.addCriteria(Criteria.where(key).`is`(decodedValue))
            }
        }
        searchKeyword?.let {
            val regexPattern = Pattern.compile(it, Pattern.CASE_INSENSITIVE)
            val searchCriteria = Criteria().orOperator(
                Criteria.where("title").regex(regexPattern),
                Criteria.where("description").regex(regexPattern)
            )
            query.addCriteria(searchCriteria)
        }
        query.addCriteria(Criteria.where("archived").`is`(archiviation_type.NOT_ARCHIVED))
        return mongoTemplate.find(query, Proposal::class.java).map { it.toDTO( externalCoSupervisorRepository) }
    }

    fun findArchivedProposalsBySupervisor(supervisorId: String): ResponseEntity<Any> {
        //Check if the supervisor exists
        professorService.findProfessorById(supervisorId)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Supervisor '$supervisorId' does NOT exist.")

        val allBySupervisor = proposalRepository.findBySupervisor(supervisorId)
        val archivedOnly = allBySupervisor.filter { it.archived == archiviation_type.MANUALLY_ARCHIVED || it.archived == archiviation_type.EXPIRED }
            .map { it.toDTO( externalCoSupervisorRepository ) }
        return ResponseEntity.status(HttpStatus.OK).body(archivedOnly)
    }

    fun findProposalsByCoSupervisor(coSupervisorId: String): ResponseEntity<Any> {
        //Check if the CoSupervisor exists
        professorService.findProfessorById(coSupervisorId)
                ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: CoSupervisor '$coSupervisorId' does NOT exist.")

        val allProposals= proposalRepository.findByCoSupervisors(coSupervisorId)
        return ResponseEntity.status(HttpStatus.OK).body(allProposals)
    }


}
