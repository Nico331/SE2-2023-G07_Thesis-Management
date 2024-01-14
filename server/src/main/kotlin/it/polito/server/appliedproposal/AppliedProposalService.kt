package it.polito.server.appliedproposal

import it.polito.server.career.CareerRepository
import it.polito.server.email.EmailService
import it.polito.server.professor.ProfessorRepository
import it.polito.server.proposal.*
import it.polito.server.student.StudentRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class AppliedProposalService(
    private val appliedProposalRepository: AppliedProposalRepository,
    private val proposalRepository : ProposalRepository,
    private val studentRepository: StudentRepository,
    private val careerRepository: CareerRepository,
    private val professorRepository: ProfessorRepository,
    private val proposalService: ProposalService,
    private val emailService: EmailService,
) {


    fun findAll() : List<AppliedProposalDTO> {
        //return list of application (in case nothing exists yet empty list)
        return appliedProposalRepository.findAll().map{ (it.toDTO())}
    }

    fun deleteAppliedProposal(id: String) : ResponseEntity<Any> {

        //check if the application exists and return NOT_FOUND
        if (!appliedProposalRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("this Application does NOT EXIST")

        appliedProposalRepository.deleteById(id)
        return ResponseEntity.status(HttpStatus.OK).body("Application with ID $id successfully deleted.")
    }

    fun applyForProposal(proposalId: String, studentId: String, file: FileDTO?) : ResponseEntity<Any> {

        val proposal = proposalRepository.findById(proposalId)
        val student = studentRepository.findById(studentId)

        //check if Proposal exists or return ERROR
        if(!proposal.isPresent)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (PROPOSAL NOT PRESENT in the database).")
        //check if Student exists or return ERROR
        if(!student.isPresent)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (STUDENT NOT PRESENT in the database).")
        //check if this application already exists
        val existingApplication = appliedProposalRepository.findByProposalIdAndStudentId(proposalId,studentId)
        if(existingApplication != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (APPLICATION ALREADY EXISTS).")
        //check if student already has an application
        if(!appliedProposalRepository.existsAppliedProposalByStudentId(studentId)){
            val appProposals = appliedProposalRepository.findByStudentId(studentId)
            appProposals.forEach{appProposal->
                run {
                    if (appProposal.status == ApplicationStatus.PENDING || appProposal.status == ApplicationStatus.ACCEPTED) {
                        println(appProposal)
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR in creating the application (STUDENT ALREADY HAS AN APPLICATION).")
                    }
                }
            }
        }

        val application = AppliedProposal(proposalId = proposalId, studentId = studentId, file = file?.content)
        val appliedProposal = appliedProposalRepository.save(application)
        val professor = professorRepository.findById(proposal.get().supervisor).get()
        CoroutineScope(Dispatchers.IO).launch {
            emailService.sendSimpleMessage(
                professor.email,
                "New application",
                "There is a new application for \"${proposal.get().title}\" proposal by the student ${student.get().name} ${student.get().surname}" +
                        "\nBest regards" +
                        "\nGestione Didattica",
                "no-reply@polito.it"
            )
        }
        return  ResponseEntity.ok(appliedProposal.toDTO())

    }

    fun appliesByStudentId(studentId: String): ResponseEntity<Any> {
        //check if student exists
        val student = studentRepository.findById(studentId)
        if(student.isEmpty)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this student NOT EXISTS")

        //return only list applications with that proposal(even empty)
        val appliesByStudentDTOs = appliedProposalRepository.findByStudentId(studentId).map { it.toDTO() }
        return ResponseEntity.ok(appliesByStudentDTOs)
    }

    fun appliesByProposalId(proposalId: String): ResponseEntity<Any> {
        //check if Proposal exists
        val proposal = proposalRepository.findById(proposalId)
        if(proposal.isEmpty)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Proposal NOT EXISTS")

        //return only list applications with that proposal(even empty)
        val appliesByProposalDTOs = appliedProposalRepository.findByProposalId(proposalId).map { it.toDTO() }
        return ResponseEntity.ok(appliesByProposalDTOs)
    }

    fun acceptProposal(applicationId: String) : ResponseEntity <Any> {
        val appliedProposal = appliedProposalRepository.findById(applicationId).orElse(null)
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Application NOT EXIST")

        //check if it already ACCEPTED
        if(appliedProposal.status==ApplicationStatus.ACCEPTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been ACCEPTED")
        //check if it already REJECTED
        if(appliedProposal.status==ApplicationStatus.REJECTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been REJECTED")
        //check if it already CANCELLED
        if(appliedProposal.status==ApplicationStatus.CANCELLED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been CANCELLED")


        //FIND and REJECT all applications given the proposalId
        val applicationsToReject = appliedProposalRepository.findByProposalId(appliedProposal.proposalId)
        applicationsToReject.map { applicationToReject->
            if (applicationToReject.status==ApplicationStatus.PENDING && applicationToReject.id!=applicationId){
                appliedProposalRepository.save(applicationToReject.copy(status = ApplicationStatus.CANCELLED))
                val proposal = proposalService.findProposalById(applicationToReject.proposalId)
                if(proposal!=null){
                    CoroutineScope(Dispatchers.IO).launch {
                        emailService.sendSimpleMessage(
                            "${applicationToReject.studentId}@studenti.polito.it",
                            "Application cancelled",
                            "The thesis application for \"${proposal.title}\" was automatically cancelled. " +
                                    "\nBest regards" +
                                    "\nGestione Didattica",
                            "no-reply@studenti.polito.it"
                        )
                    }
                    if(proposal.coSupervisors.isNotEmpty()){
                        proposal.coSupervisors.forEach{coSupervisorId-> run{
                            val coSupervisor = professorRepository.findById(coSupervisorId)
                            if (coSupervisor.isEmpty){
                                CoroutineScope(Dispatchers.IO).launch {
                                    emailService.sendSimpleMessage(
                                        coSupervisorId,
                                        "Application cancelled",
                                        "The thesis application for \"${proposal.title}\" was automatically cancelled}" +
                                                "\nBest regards" +
                                                "\nGestione Didattica",
                                        "no-reply@polito.it"
                                    )
                                }
                            }
                        }}
                    }
                    if(proposal.externalCoSupervisors?.isNotEmpty() == true){
                        proposal.externalCoSupervisors!!.forEach{ externalCoSupervisor-> run{
                            CoroutineScope(Dispatchers.IO).launch {
                                emailService.sendSimpleMessage(
                                    externalCoSupervisor.email,
                                    "Application cancelled",
                                    "The thesis application for \"${proposal.title}\" was automatically cancelled" +
                                            "\nBest regards" +
                                            "\nGestione Didattica",
                                    "no-reply@polito.it"
                                )
                            }
                        }}
                    }
                }
            }
        }
        //ONLY ACCEPTED this application
        appliedProposalRepository.save(appliedProposal.copy(status = ApplicationStatus.ACCEPTED))
        val proposal = proposalService.findProposalById(appliedProposal.proposalId)
        if(proposal!=null){
            if(professorRepository.findById(proposal.supervisor).isPresent){
                val professor = professorRepository.findById(proposal.supervisor).get()
                CoroutineScope(Dispatchers.IO).launch {
                    emailService.sendSimpleMessage(
                        "${appliedProposal.studentId}@studenti.polito.it",
                        "Application accepted",
                        "The thesis application for \"${proposal.title}\" was accepted by prof. ${professor.name} ${professor.surname}" +
                                "\nBest regards" +
                                "\nGestione Didattica",
                        "no-reply@studenti.polito.it"
                    )
                }
                if(proposal.coSupervisors.isNotEmpty()){
                    proposal.coSupervisors.forEach{coSupervisorId-> run{
                        val coSupervisor = professorRepository.findById(coSupervisorId)
                        if (coSupervisor.isEmpty){
                            CoroutineScope(Dispatchers.IO).launch {
                                emailService.sendSimpleMessage(
                                    coSupervisorId,
                                    "Application accepted",
                                    "The thesis application for \"${proposal.title}\" was accepted by prof. ${professor.name} ${professor.surname}" +
                                            "\nBest regards" +
                                            "\nGestione Didattica",
                                    "no-reply@polito.it"
                                )
                            }
                        }
                    }}
                }
                if(proposal.externalCoSupervisors?.isNotEmpty() == true){
                    proposal.externalCoSupervisors!!.forEach{ externalCoSupervisor-> run{
                        CoroutineScope(Dispatchers.IO).launch {
                            emailService.sendSimpleMessage(
                                externalCoSupervisor.email,
                                "Application accepted",
                                "The thesis application for \"${proposal.title}\" was accepted by prof. ${professor.name} ${professor.surname}" +
                                        "\nBest regards" +
                                        "\nGestione Didattica",
                                "no-reply@polito.it"
                            )
                        }
                    }}
                }
            }
        }


        //SETS the PROPOSAL as MANUALLY_ARCHIVED
        proposalService.manuallyArchivedProposal(appliedProposal.proposalId)

        return ResponseEntity.ok().body("Successful operation")
    }

    fun rejectProposal(applicationId: String) : ResponseEntity <Any> {
        val appliedProposal = appliedProposalRepository.findById(applicationId).orElse(null)

        //check if it exists
        if(appliedProposal == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ERROR: this Application NOT EXIST")

        /*
        //check if proposal already ARCHIVED
        val proposal: Proposal? = proposalRepository.findById(appliedProposal.proposalId).orElse(null)
        if(proposal?.archived == archiviation_type.MANUALLY_ARCHIVED || proposal?.archived == archiviation_type.EXPIRED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Proposal has already been ARCHIVED ")
        */

        //check if it already ACCEPTED
        if(appliedProposal.status==ApplicationStatus.ACCEPTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been ACCEPTED")
        //check if it already REJECTED
        if(appliedProposal.status==ApplicationStatus.REJECTED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been REJECTED")
        //check if it already CANCELLED
        if(appliedProposal.status==ApplicationStatus.CANCELLED)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("ERROR: this Application has already been CANCELLED")

        //ONLY REJECTED this application
        println("In reject application")
        appliedProposalRepository.save(appliedProposal.copy(status = ApplicationStatus.REJECTED))
        val proposal = proposalService.findProposalById(appliedProposal.proposalId)
        if(proposal!=null){
            if(professorRepository.findById(proposal.supervisor).isPresent){
                val professor = professorRepository.findById(proposal.supervisor).get()
                CoroutineScope(Dispatchers.IO).launch {
                    emailService.sendSimpleMessage(
                        "${appliedProposal.studentId}@studenti.polito.it",
                        "Application rejected",
                        "The thesis application for \"${proposal.title}\" was rejected by prof. ${professor.name} ${professor.surname}" +
                                "\nBest regards" +
                                "\nGestione Didattica",
                        "no-reply@studenti.polito.it"
                    )
                }
                if(proposal.coSupervisors.isNotEmpty()){
                    proposal.coSupervisors.forEach{coSupervisorId-> run{
                        val coSupervisor = professorRepository.findById(coSupervisorId)
                        if (coSupervisor.isEmpty){
                            CoroutineScope(Dispatchers.IO).launch {
                                emailService.sendSimpleMessage(
                                    coSupervisorId,
                                    "Application rejected",
                                    "The thesis application for \"${proposal.title}\" was rejected by prof. ${professor.name} ${professor.surname}" +
                                            "\nBest regards" +
                                            "\nGestione Didattica",
                                    "no-reply@polito.it"
                                )
                            }
                        }
                    }}
                }
                if(proposal.externalCoSupervisors?.isNotEmpty() == true){
                    proposal.externalCoSupervisors!!.forEach{ externalCoSupervisor-> run{
                        CoroutineScope(Dispatchers.IO).launch {
                            emailService.sendSimpleMessage(
                                externalCoSupervisor.email,
                                "Application rejected",
                                "The thesis application for \"${proposal.title}\" was rejected by prof. ${professor.name} ${professor.surname}" +
                                        "\nBest regards" +
                                        "\nGestione Didattica",
                                "no-reply@polito.it"
                            )
                        }
                    }}
                }
            }
        }

        return ResponseEntity.ok().body("Successful operation")
    }


    fun findByProfessor(professorId: String, vararg archiviationTypes : archiviation_type) : List<StrangeObjectRequestedByDarione>{
        val proposals = proposalRepository.findBySupervisor(professorId)
        return proposals
            .filter { archiviationTypes.contains(it.archived) }
            .map { proposal->
            val appliedProposals = appliedProposalRepository.findByProposalId(proposal.id!!).map { it.toDTO() }
            val listApplications = appliedProposals.map { appliedProposal->
                val student = studentRepository.findById(appliedProposal.studentId).map { it.toDTO() }.get()
                val listExams = careerRepository.findByStudentId(student.id!!).map { it.toDTO() }
                return@map Applications(
                    appliedProposal.id,
                    appliedProposal.proposalId,
                    Student(
                        student.id,
                        student.surname,
                        student.name,
                        student.gender,
                        student.nationality,
                        student.email,
                        student.codDegree,
                        student.enrollmentYear,
                        listExams
                    ),
                    appliedProposal.status,
                    appliedProposal.file
                )
            }
            val nameSupervisor = professorRepository.findById(proposal.supervisor)
            /*
            val coSup = proposal.coSupervisors.map { it ->
                val prof = professorRepository.findById(it).get();
                return@map "${prof.name} ${prof.surname}"
            }

             */
            return@map StrangeObjectRequestedByDarione(
                proposal.id,
                proposal.title,
                "${nameSupervisor.get().name} ${nameSupervisor.get().surname}",
                proposal.coSupervisors,
                proposal.keywords,
                proposal.type,
                proposal.groups,
                proposal.description,
                proposal.requiredKnowledge,
                proposal.notes,
                proposal.expiration,
                proposal.level,
                proposal.cdS,
                proposal.archived,
                listApplications
            )
        }
    }

    fun updateApplicationsStatus(proposal: Proposal) {
        val newStatus = when (proposal.archived) {
            archiviation_type.EXPIRED, archiviation_type.MANUALLY_ARCHIVED -> ApplicationStatus.CANCELLED
            else -> ApplicationStatus.PENDING
        }
        val applications = appliedProposalRepository.findByProposalId(proposal.id!!)
        for (application in applications) {
            application.status = newStatus
            appliedProposalRepository.save( application )
        }

    }

    fun withdrawProposal(appliedProposalId: String): ResponseEntity<Any>{
        val proposal = appliedProposalRepository.findById(appliedProposalId)
        return if(proposal.isPresent){
            ResponseEntity(appliedProposalRepository.save(proposal.get().copy(status = ApplicationStatus.CANCELLED)),HttpStatus.OK)
        } else {
            ResponseEntity("Application not found", HttpStatus.NOT_FOUND)
        }
    }


    fun findByCoSupervisor(coSupervisorId: String, vararg archiviationTypes : archiviation_type) : List<StrangeObjectRequestedByDarione>{
        val proposals = proposalRepository.findByCoSupervisors(coSupervisorId)
        return proposals
                .filter { archiviationTypes.contains(it.archived) }
                .map { proposal->
                    val appliedProposals = appliedProposalRepository.findByProposalId(proposal.id!!).map { it.toDTO() }

                    val listApplications = appliedProposals.map { appliedProposalDTO->
                        val student = studentRepository.findById(appliedProposalDTO.studentId).map { it.toDTO() }.get()

                        val listExams = careerRepository.findByStudentId(student.id!!).map { it.toDTO() }
                        return@map Applications(
                            appliedProposalDTO.id,
                            appliedProposalDTO.proposalId,
                                Student(
                                        student.id,
                                        student.surname,
                                        student.name,
                                        student.gender,
                                        student.nationality,
                                        student.email,
                                        student.codDegree,
                                        student.enrollmentYear,
                                        listExams
                                ),
                            appliedProposalDTO.status,
                            appliedProposalDTO.file
                        )
                    }
                    //val nameSupervisor = professorRepository.findById(proposal.supervisor)
                    /*
                    val coSup = proposal.coSupervisors.map { it ->
                        val prof = professorRepository.findById(it).get();
                        return@map "${prof.name} ${prof.surname}"
                    }

                     */
                    return@map StrangeObjectRequestedByDarione(
                            proposal.id,
                            proposal.title,
                            proposal.supervisor,
                            proposal.coSupervisors,
                            proposal.keywords,
                            proposal.type,
                            proposal.groups,
                            proposal.description,
                            proposal.requiredKnowledge,
                            proposal.notes,
                            proposal.expiration,
                            proposal.level,
                            proposal.cdS,
                            proposal.archived,
                            listApplications
                    )
                }
    }
}
