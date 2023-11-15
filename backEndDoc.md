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
	"archived" : boolean	
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
- Get an existing Proposal
	- GET ___`/API/proposals/{proposalID}`___
	- Return the requested proposal if exists, otherwise response code 404.
- Get all existing Proposals
	- GET ___`/API/proposals`___
	- Return an array of ProposalDTO objects. It contains all the proposals in the database.
- Get all the Proposals created by a supervisor
	- GET ___`/API/proposals/{supervisorID}`___
	- Return an array of ProposalDTO objects. The proposals are the only ones created by the supervisor specified in the URL.
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
"enrollmentYear" : Int
"passwordHash" : nullable String
}
```

## Student APIs

- Create a new Student
	- POST ___`/API/students`___ 
	- Request body must contain a Student (__not StudentDTO) object with the `"id" = null`.
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
	"status" : enum {"PENDING", "APPROVED", "REJECTED"},
}
```

## AppliedProposal APIs

- Create an Application
	- POST ___`/API/appliedProposal/apply/{proposalId}/{studentId}`___
	- Return the new AppliedProposalTDO if success.
	- Return BAD_REQUEST status if the _studentId_ student has already applied for the _proposalId_ proposal. 
- Get an existing Application
	- GET ___`/API/appliedProposal/{id}`___
	- Return the requested AppliedProposalDTO
- Get all the existing Applications
	- GET ___`/API/appliedProposal`___
	- Return an array of AppliedProposalDTO objects. It contains all the applications in the database.
- Get all the Applications by a specific student
	- GET ___`/API/appliedProposal/{studentID}`___
	- Return an array of AppliedProposalDTO objects. The Applications are the only ones applied by the student specified in the URL.
- Accept an Application
	- PUT ___`/API/appliedProposal/accept/{applicationId}`___
	- Return OK status if success.
	- Return NOT_FOUND if the Applications doesn't exist.
-  Reject an Application
	- PUT ___`/API/appliedProposal/reject/{applicationId}`___
	- Return OK status if success.
	- Return NOT_FOUND if the Applications doesn't exist.
- Delete an existing Application
	- DELETE ___`/API/appliedProposal/{applicationID}`___
	- Return OK status if success.