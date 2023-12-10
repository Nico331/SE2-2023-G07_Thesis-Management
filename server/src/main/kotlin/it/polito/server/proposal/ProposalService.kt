package it.polito.server.proposal

import it.polito.server.appliedproposal.ApplicationStatus
import it.polito.server.appliedproposal.AppliedProposalRepository
import it.polito.server.professor.ProfessorRepository
import it.polito.server.professor.ProfessorService
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.net.URLDecoder
import java.nio.charset.StandardCharsets
import java.text.SimpleDateFormat
import java.util.regex.Pattern

@Service
class ProposalService (private val proposalRepository : ProposalRepository,
                       private val professorService: ProfessorService,
                       private val appliedProposalRepository: AppliedProposalRepository
    ) {

    fun updateProposal(id: String, update: ProposalDTO): ProposalDTO? {
        val proposal = proposalRepository.findById(id).orElse(null) ?: return null
        val isExpired = archiviation_type.NOT_ARCHIVED
        return proposalRepository.save(update.toDBObj()).toDTO()
    }

    fun createProposal(proposal: ProposalDTO): ProposalDTO {
        val savedProposal = proposalRepository.save(proposal.toDBObj())
        return savedProposal.toDTO()
    }

    fun findProposalById(id: String): ProposalDTO? {
        return proposalRepository.findById(id).map(Proposal::toDTO).orElse(null)
    }
    fun findAll() : List<ProposalDTO> {
        //println(proposalRepository.findByArchived(archiviation_type.NOT_ARCHIVED).map{(it.toDTO())})
        //println(proposalRepository.findAll().map{(it.toDTO())})
        //return proposalRepository.findByArchived(archiviation_type.NOT_ARCHIVED).map{(it.toDTO())}
        return proposalRepository.findAll().map{(it.toDTO())}
    }

    fun findActiveByStudent( studentId : String): List<ProposalDTO>? {
        val activeProposals = proposalRepository.findByArchived( archiviation_type.NOT_ARCHIVED )
        val filteredProposals = activeProposals.filter { appliedProposalRepository.findByProposalIdAndStudentId( it.id!!, studentId) != null }
        return filteredProposals.map { it.toDTO() }
    }

    fun deleteProposal(id: String) : ResponseEntity<Any> {
        if (!proposalRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proposal doesn't exists")

        val proposal = proposalRepository.findById(id).get()
        if(proposal.archived == archiviation_type.MANUALLY_ARCHIVED || proposal.archived == archiviation_type.EXPIRED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Proposal is already archived")

        proposalRepository.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    fun findActiveProposalsBySupervisor(supervisor:String): ResponseEntity<Any> {

        //Check if the supervisor exists
        val supervisorExists = professorService.findProfessorById(supervisor)
        if( supervisorExists == null )
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: Supervisor '$supervisor' does NOT exist.")

        //Check if the supervisor has any proposals
        val allProposals = proposalRepository.findBySupervisor(supervisor)
        if(allProposals.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Supervisor '$supervisor' has NO proposals.")

        //Check if the supervisor has any active proposals
        val activeProposals = allProposals.filter { it.archived==archiviation_type.NOT_ARCHIVED }
        if(activeProposals.isEmpty())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Supervisor '$supervisor' has NO ACTIVE proposals.")

        val activeProposalsDTOs = activeProposals.map { it.toDTO() }
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
        if(proposalEntity.archived == archiviation_type.MANUALLY_ARCHIVED || proposalEntity.archived == archiviation_type.EXPIRED){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Proposal is already archived")
        }

        //set to MANUALLY_ARCHIVED and save
        proposalRepository.save(proposalEntity.copy(archived = archiviation_type.MANUALLY_ARCHIVED))

        return ResponseEntity.ok("Proposal '$id' archived manually successfully")
    }
    fun findProposalBySupervisor(supervisor: String): List<ProposalDTO> {
        return proposalRepository.findBySupervisor(supervisor).map { it.toDTO() };
    }

    fun existsByTitleAndSupervisor (proposalTitle : String, proposalSupervisor : String): Boolean {
        val res = proposalRepository.existsProposalByTitleAndSupervisor (proposalTitle, proposalSupervisor)
        return res
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
        return mongoTemplate.find(query, Proposal::class.java).map { it.toDTO() }
    }
}
