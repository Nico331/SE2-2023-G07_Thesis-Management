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
- Get all the applications related to a professor.
	- GET ___`/API/appliedProposal/{professorId}`___
	- Return an array of LongObjProposal objects. 
    - Every proposal has the specified professor as supervisor.
    - Every proposal contains an array of Application.
      - Every Application object has the student info who has created it.
- Accept an Application
	- PUT ___`/API/appliedProposal/accept/{applicationId}`___
	- Return OK status if success.
	- Return NOT_FOUND if the Applications doesn't exist.
    - It reject automatically all the other applications for the same proposal. 
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

## Career APIs
........

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

## Degree APIs

-----

# Virtual Clock and time logic

The time logic in the server is implemented via the Java class Clock. The service _ClockService_
owns 2 different clocks: the real time clock and a virtual clock.

A scheduled function is run automatically every T time, and check clocks: if a new day has started,
the server will update all proposal's archived state, depending on the expiration date.

Note that if the proposal has been manually archived by the professor, it will remain archived anyways.

The virtual clock allow testing and showing features about expirations and time-events handling. It can be setted by
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