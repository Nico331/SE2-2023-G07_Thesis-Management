package it.polito.server.proposal

import it.polito.server.professor.ProfessorRepository
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
class ProposalService (private val proposalRepository : ProposalRepository ) {

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
        return proposalRepository.findAll().map{(it.toDTO())}
    }

    fun deleteProposal(id: String) : ResponseEntity<Any> {
        if (!proposalRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Proposal doesn't exists")
        proposalRepository.deleteById(id)
        return ResponseEntity(HttpStatus.OK)
    }

    fun findActiveProposalsBySupervisor(supervisor:String): List<ProposalDTO>{
        return proposalRepository.findByArchivedFalseAndSupervisor(supervisor).map{(it.toDTO())}
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
        return mongoTemplate.find(query, Proposal::class.java).map { it.toDTO() }
    }

}
