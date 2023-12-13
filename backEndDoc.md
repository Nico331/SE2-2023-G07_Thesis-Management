# Proposal
## Proposal Object

A Proposal is a thesis proposal created by a professor. It can be applied by students.
 

```json
ProposalDTO
{
	"id" : nullable String,
	"title" : String,
	"supervisor" : String,
	"coSupervisors" : String[],
	"externalCoSupervisors" : nullable ExternalCoSupervisorDTO[],
	"keywords" : String[],
	"type" : String,
	"groups" : String[],
	"description" : String,
	"requiredKnowledge" : String,
	"notes" : String,
	"expiration" : String YYYY-MM-DD,
	"level" : String,
	"cdS" : String[],
	"archived" : enum {EXPIRED, MANUALLY_ARCHIVED, NOT_ARCHIVED}	
}
```

```json
ExternalCoSupervisorDTO
{
	"name" : String,
	"surname" : String,
	"email" : String	
}
```

## Proposal APIs

- Create a new Proposal
	- POST ___`/API/proposals`___ 
	- Request body must contain a ProposalDTO object with the `"id" = null`.
	- Return the just saved ProposalDTO with the new _id_ field.
- Update an existing Proposal
	- PUT ___`/API/proposals/{proposalID}`___
	- Request body must contain the updated ProposalDTO.
	- Return the just updated and saved ProposalDTO object.
- Archive a Proposal
	- PUT ___`/API/proposals//manuallyarchived/{proposalID}`___
    - Returns OK if success, BAD_REQUEST or NOT_FOUND otherwise.
- Get an existing Proposal
	- GET ___`/API/proposals/{proposalID}`___
	- Return the requested proposal if exists, otherwise response code 404.
- Get all existing Proposals
	- GET ___`/API/proposals`___
	- Return an array of ProposalDTO objects. It contains all the proposals in the database.
- Get all the active proposals and filtered for a student.
  	- GET ___`/API/proposals/student/{studentid}`___
  	- Returns all the active (not archived, not expired) proposals, without the ones the student already applied for.
- Get all the active Proposals created by a supervisor
	- GET ___`/API/proposals/bysupervisor/{supervisorID}`___
	- Returns an array of ProposalDTO objects. The proposals are the only ones created by the supervisor specified and still active (not archived, not expired).
- Get all the archived (both expired and manually archived) Proposals created by a supervisor
	- GET ___`/API/proposals/bysupervisor/archived/{supervisorID}`___
	- Returns an array of ProposalDTO objects. The proposals are the only ones created by the supervisor specified and archived (manually archived or expired).
- Get all the active Proposals matching the filters
	- GET ___`/API/proposals/filters?filter1=value1&filter2=value2&...`___
	- Returns the Proposals that match with searching filters.
- Delete an existing Proposal
	- DELETE ___`/API/proposals/{proposalID}`___
	- Return the status OK when success.

----

# Professor
## Professor Object
A Professor can create a thesis Proposal, accept and decline Student Applications.

The login credentials are the _email_ as username and "password" as password.

```json
ProfessorDTO
{
	"id" : nullable String,
	"name" : String,
	"surname" : String,
	"email" : String,
	"codGroup" : String,
	"codDepartment" : String
}
```

``` json
Professor
{
	"id" : nullable String,
	"name" : String,
	"surname" : String,
	"email" : String,
	"codGroup" : String,
	"codDepartment" : String
	"passwordHash" : nullable String
}
```
## Professor APIs

- Create a new Professor
	- POST ___`/API/professors`___ 
	- Request body must contain a Professor (__not ProfessorDTO__) object with the `"id" = null`.
	- Return the just saved ProfessorDTO with the new _id_ field.
- Update an existing Professor
	- PUT ___`/API/professors/{professorID}`___
	- Request body must contain the updated ProfessorDTO object.
	- Return the just updated and saved ProfessorDTO object.
- Get an existing Professor
	- GET ___`/API/professors/{professorID}`___
	- Return the requested ProfessorDTO if exists, otherwise response code 404.
- Get all existing Professors
	- GET ___`/API/professors`___
	- Return an array of ProfessorsDTO objects. It contains all the professors in the database.
- Delete an existing Professor
	- DELETE ___`/API/professors/{professorID}`___
	- Return the status OK when success.

----

# Student

## Student Object
A Student object represents a university student. It can browse the active thesis proposals and apply for them.

```json
StudentDTO
{
"id" : nullable String,
"name" : String,
"surname" : String,
"gender" : String,
"nationality" : String,
"email" : String,
"codDegree" : String,
"enrollmentYear" : Int
}
```

```json
Student
{
"id" : nullable String,
"name" : String,
"surname" : String,
"gender" : String,
"nationality" : String,
"email" : String,
"codDegree" : String,
"enrollmentYear" : Int,
"passwordHash" : nullable String
}
```

## Student APIs

- Create a new Student
	- POST ___`/API/students`___ 
	- Request body must contain a Student (__not StudentDTO__) object with the `"id" = null`.
	- Return the just saved StudentDTO with the new _id_ field.
- Update an existing Student
	- PUT ___`/API/students/{studentID}`___
	- Request body must contain the updated StudentDTO object.
	- Return the just updated and saved StudentDTO object.
- Get an existing Student
	- GET ___`/API/students/{studentID}`___
	- Return the requested StudentDTO if exists, otherwise response code 404.
- Get all existing Students
	- GET ___`/API/students`___
	- Return an array of StudentDTO objects. It contains all the students in the database.
- Delete an existing Student
	- DELETE ___`/API/students/{studentID}`___
	- Return the status OK when success.

----

# Applied Proposal

## AppliedProposal Object
An AppliedProposal object represents a thesis proposal application from a student.

```json
AppliedProposalDTO
{
	"id" : nullable String,
	"proposalId" : String,
	"studentId" : String,
	"status" : enum {"PENDING", "APPROVED", "REJECTED", "CANCELLED"},
	"file" : nullable FileDTO
}
```

```json
FileDTO
{
	"content": ByteArray,
	"name": String,
	"originalFilename": String,
	"contentType": String
}
```

```json
LongObjProposal
{
	"id": nullable String,
	"title": String,
	"supervisor": String,
	"coSupervisors": String[],
	"keywords": String[],
	"type": String,
	"groups": String[],
	"description": String,
	"requiredKnowledge" : String,
	"notes" : String,
	"expiration" : LocalDate,
	"level": String,
	"cdS" : String[],
	"archived" : enum {EXPIRED, MANUALLY_ARCHIVED, NOT_ARCHIVED},
	"applications": Applications[]
}
```
```json
Applications
{
	"id": nullable String,
	"proposalId": String,
	"student": Student,
	"status": enum {"PENDING", "APPROVED", "REJECTED", "CANCELLED"},
	"file": nullable FileDTO
}
```

```json
Student
{
	"id": nullable String,
	"surname": String,
	"name": String,
	"gender": String,
	"nationality": String,
	"email": String,
	"codDegree": String,
	"enrollmentYear": Int,
	"listExams": CareerDTO[]
}
```




## AppliedProposal APIs

- Create an Application
	- POST ___`/API/appliedProposal/apply/{proposalId}/{studentId}`___
	- Return the new AppliedProposalTDO if success.
	- Return BAD_REQUEST status if the _studentId_ student has already applied for the _proposalId_ proposal.
- Get all the existing Applications
	- GET ___`/API/appliedProposal`___
	- Return an array of all the AppliedProposalDTO objects in the database.
- Get all the Applications by a specific student
	- GET ___`/API/appliedProposal/bystudent/{studentID}`___
	- Return an array of AppliedProposalDTO objects. The Applications are the only ones applied by the student specified in the URL.
- Get all the applications for a specific proposal.
	- GET ___`/API/appliedProposal/byproposal/{proposalID}`___
    - Return an array of AppliedProposalDTO objects. The Applications are the only ones related to the proposal specified in the URL.
- Get all the active applications related to a professor.
	- GET ___`/API/appliedProposal/active/{professorId}`___
	- Return an array of LongObjProposal objects. 
    - Every proposal is still active (no expired, no manually archived) and has the specified
    professor as supervisor.
    - Every proposal contains an array of Application.
      - Every Application object has the student info who has created it.
- Get all the archived applications related to a professor.
	- GET ___`/API/appliedProposal/archived/{professorId}`___
	- Return an array of LongObjProposal objects.
	- Every proposal is no more active (=> expired or manually archived) and has the specified
	  professor as supervisor.
	- Every proposal contains an array of Application.
		- Every Application object has the student info who has created it.
- Accept an Application
	- PUT ___`/API/appliedProposal/accept/{applicationId}`___
	- Return OK status if success.
	- Return NOT_FOUND if the Applications doesn't exist.
    - It cancels automatically all the other applications for the same proposal. 
-  Reject an Application
	- PUT ___`/API/appliedProposal/reject/{applicationId}`___
	- Return OK status if success.
	- Return NOT_FOUND if the Applications doesn't exist.
- Delete an existing Application
	- DELETE ___`/API/appliedProposal/{applicationID}`___
	- Return OK status if success.


  ----

# Career

## Career Object
A Career object represents ...

```json
CareerDTO
{
	"id" : nullable String,
	"studentId" : String,
	"codCourse" : String,
	"titleCourse" : String,
	"cfu" : Int,
	"grade" : Int,
	"date" : String
}
```

```json
Career
{
	"id" : nullable String,
	"studentId" : String,
	"codCourse" : String,
	"titleCourse" : String,
	"cfu" : Int,
	"grade" : Int,
	"date" : String
}
```


## Career APIs

- Create a new Career
	- POST ___`/API/careers`___
    - Request body must contain a Career object with the `"id" = null`.
    - Return a _CREATED_ status if success.
    - Return the just saved CareerDTO with the new _id_ field.
- Get an existing Career
    - GET ___`/API/careers/{careerID}`___
    - Return the requested CareerDTO if exists, otherwise response code 404.
- Get all existing Careers
    - GET ___`/API/careers`___
    - Return an array of CareerDTO objects. It contains all the careers in the database.
- Update an existing Career
	- PUT ___`/API/careers/{careerID}`___
    - Request body must contain the updated CareerDTO object.
    - Return the just updated and saved CareerDTO object.
- Delete an existing Career
    - DELETE ___`/API/careers/{careerID}`___
    - Return the status OK when success, NOT_FOUND otherwise.
    ----

# Degree

## Degree Object
A Degree object represents ...

```json
DegreeDTO
{
	"id" : nulalble String,
	"codDegree" : String,
	"titleDegree" : String
}
```

```json
Degree
{
	"id" : nulalble String,
	"codDegree" : String,
	"titleDegree" : String
}
```

## Degree APIs

- Create a new Degree
	- POST ___`/API/Degree`___
	- Request body must contain a Degree object with the `"id" = null`.
	- Return a _CREATED_ status if success.
	- Return the just saved DegreeDTO with the new _id_ field.
- Get an existing Career
	- GET ___`/API/Degree/{DegreeID}`___
	- Return the requested DegreeDTO if exists, otherwise response code 404.
- Get all existing Degrees
	- GET ___`/API/Degree`___
	- Return an array of DegreeDTO objects. It contains all the Degrees in the database.
- Update an existing Degree
	- PUT ___`/API/Degree/{DegreeID}`___
	- Request body must contain the updated DegreeDTO object.
	- Return the just updated and saved DegreeDTO object.
- Delete an existing Career
	- DELETE ___`/API/Degree/{DegreeID}`___
	- Return the status OK when success, NOT_FOUND otherwise.

-----

# Virtual Clock and time logic

The time logic in the server is implemented via the Java class Clock. The service _ClockService_
owns 2 different clocks: the real time clock and a virtual clock.

A scheduled function is run automatically every T time, and check clocks: if a new day has started,
the server will update all proposal's archived state, depending on the expiration date.

Note that if the proposal has been manually archived by the professor, it will remain archived anyway.

The virtual clock allow testing and showing features about expirations and time-events handling. It can be set by
the webapp page.

## Virtual Clock APIs

- Set a new virtual clock.
  - PUT ___`/API/virtualclock/set/{dateTimeToSet}`___
  - The path variable _dateTimeToSet_ must be formatted like __"yyyy-MM-dd'T'HH:mm:ss"__.
  - This API set a new virtual clock and updates all the archived states of the proposals.
  - It allows to set both past Dates and future Dates.
  - The webapp must re-fetch the new data when an OK response is returned.
- Reset to the real time clock.
  - PUT ___`/API/virtualclock/reset`___
  - It reset the server clock to the real time one and updates the archived states accordingly.
  - The webapp must re-fetch the updated data when an OK response is returned.
  - If a proposal is set as "manually archived", it remains as such.
- Get server's in use clock.
  - GET ___`/API/virtualclock/getServerClock`___
  - Return the used clock in the server: a virtual clock if set, real time clock otherwise.

# Secretary

It represents the secretary of the university. It can preliminary accept or reject
a student thesis proposal.

```json
SecretaryDTO {
        "id": nullable String,
        "name": String,
        "surname" : String,
        "email" : String,
}
```

```json
Secretary {
        "id": nullable String,
        "name": String,
        "surname" : String,
        "email" : String,
}
```

## Secretary APIs

- Create a new Secretary
	- POST ___`/API/secretaries`___
	- Request body must contain a Secretary (__not SecretaryDTO__) object with the `"id" = null`.
	- Return the just saved SecretaryDTO with the new _id_ field.
- Update an existing Secretary
    - PUT ___`/API/secretaries/{secretaryID}`___
    - Request body must contain the updated SecretaryDTO object.
    - Return OK status if success and the just updated and saved SecretaryDTO object.
    - Return NOT_FOUND if the Secretary doesn't exist.
- Get an existing Secretary
    - GET ___`/API/secretaries/{secretaryID}`___
    - Return the requested SecretaryDTO if exists, otherwise response code 404.
- Get all existing Secretaries
    - GET ___`/API/secretaries`___
    - Return an array of SecretaryDTO objects. It contains all the secretaries in the database.
- Delete an existing Secretary
    - DELETE ___`/API/secretaries/{secretaryID}`___
    - Return the status OK when success, NOT_FOUND otherwise.

----

# Request of Proposal

This entity represents a request of thesis proposal by a student.
It must be accepted by the secretary first, then by the professor.

```json
RequestProposal(
        "id": nullable String,
        "title": String,
        "studentId": String,
        "supervisorId": String,
        "coSupervisors": String[],
        "description": String,
        "acceptanceDate": nullable LocalDate,
        "secretaryStatus": RequestProposalStatus,
        "supervisorStatus": RequestProposalStatus
}
```

```json
RequestProposalDTO (
        "id": nullable String,
        "title": String,
        "studentId": String,
        "supervisorId": String,
        "coSupervisors": String[],
        "description": String,
        "acceptanceDate": nullable LocalDate,
        "secretaryStatus": RequestProposalStatus,
        "supervisorStatus": RequestProposalStatus
}
```

```
RequestProposalStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}
```

## Request of Proposal APIs

- Create a new Request of Proposal
	- POST ___`/API/requestProposal`___
	- Request body must contain a RequestProposalDTO object with the `"id" = null`.
	- Return CREATED status and the just saved RequestProposalDTO with the new _id_ field if success.
    - Return BAD_REQUEST if the student has already created that proposal or if
      the professor doesn't exist.
- Update an existing Request of Proposal
    - PUT ___`/API/requestProposal/{requestProposalID}`___
    - Request body must contain the updated RequestProposalDTO object.
    - Return OK status and the just updated and saved RequestProposalDTO object if success.
    - Return NOT_FOUND if the RequestProposal doesn't exist.
- Get an existing Request of Proposal
	- GET ___`/API/requestProposal/{requestProposalID}`___
	- Return the requested RequestProposalDTO if exists, otherwise response code 404.
- Get all existing Request of Proposals
	- GET ___`/API/requestProposal`___
	- Return an array of RequestProposalDTO objects. It contains all the Request of Proposals in the database.
- Get all the Request of Proposals by a specific student
	- GET ___`/API/requestProposal/byStudent/{studentID}`___
	- Return an array of RequestProposalDTO objects. The Request of Proposals are the only ones created by 
      the student specified in the URL.
- Acceptance / rejection of a Request of Proposal by the secretary
	- PUT ___`/API/requestProposal/bySecretary/[accept||reject]/{requestProposalID}`___
- Acceptance / rejection of a Request of Proposal by the supervisor
	- PUT ___`/API/requestProposal/bySupervisor/[accept||reject]/{requestProposalID}`___
- Delete an existing Request of Proposal
	- DELETE ___`/API/requestProposal/{requestProposalID}`___
	- Return the status OK when success, NOT_FOUND otherwise.