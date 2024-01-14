# Thesis Management System Guide

## Table of contents

[//]: # (2. [Prerequisites]&#40;#prerequisites&#41;)

[//]: # (3. [Installation and Execution]&#40;#installation&#41;)
1. [Introduction](#introduction)
2. [Log In](#login)
3. [Virtual Clock](#VC)
4. [Are you a student?](#student)

   4.1 [Proposal List](#search)
   
   4.2 [Apply For A Thesis Proposal](#apply)

   4.3 [My Applications](#apps)

   4.4 [New Thesis Request](#newthesisrequest)

   4.5 [My Thesis Request](#mythesisrequest)

   4.6  [Forum](#forumstud)
5. [Are you a professor?](#professor)

   5.1 [Add a new proposal](#add)

   5.2 [My thesis proposal](#props)

   5.3 [Co-supervised Proposals](#cosupervised)

   5.4 [Archive](#archive)

   5.5 [Pending Requests](#pendingrequests)

   5.6 [Archived Requests](#archivedrequests)

   5.7 [Forum](#forumprof)
6. [Are you a secretary?](#secretary)

   6.1 [Requested Proposals](#requestedproposals)

## 1 Introduction <a name="introduction"></a>

Welcome to Polito Thesis Management System, the perfect solution to facilitate the thesis management for
student and professor of Politecnico of Turin.

The software is completely compatible with smartphones and medium size devices.

Let's take a look at the system's features and how to use them.

## 2 Login <a name="login"/>

From the initial page you can log in with one of the following default usernames.

The **password** is the email part before the '@' for all users. For example, if the user email is
**'s100001@studenti.polito.it'** the password will be **'s100001'**

Students usernames:
- s300001@studenti.polito.it
- s300002@studenti.polito.it
- s300003@studenti.polito.it
- s300004@studenti.polito.it
- s300005@studenti.polito.it

Professors usernames:
- p300001@polito.it
- p300002@polito.it
- p300003@polito.it
- p300004@polito.it
- p300005@polito.it

Secretaries usernames:
- secretary01@polito.it

An error alert will arise in case of invalid credentials.

<img src="guideImages/login.png" alt="drawing" width="500"/>

## 3 Virtual Clock <a name="VC"/>

On the bottom of every page you will see the **Virtual Clock**, by default it shows the current date, but you can change
its value opening the calendar and selecting a new date. Click the **"set"** button to confirm the new date. The
**"reset"** button will reinitialize the clock to the current date. The Virtual Clock is used for testing purpose. The
pages will change their data depending on the Virtual Clock value.

<img src="guideImages/VirtualClock.png" alt="drawing" width="500"/>

## 4 Are you a student? <a name="student"/>

From the main page you can choose between some options each with its own button which will redirect you to the
appropriate page:

- proposal List
- My Applications
- New Thesis Request
- My Thesis Request
- Forum

In every moment you can change page or logout browsing the **menu** in the top right part of the pages.

<img src="guideImages/mainStudent.png" alt="drawing" width="500"/>

### 4.1 Proposal List <a name="search"/>

This page presents on the **list of available proposals** and the **filters board**.

Clicking the **rounded arrow** the list will be updated, maybe the proposal you are searching for has been just added. 

From the filters board you can search a specific proposal typing some keywords or selecting some filters (you can select
more than one options for each field).

You can scroll down the list searching for an interesting proposal. Clicking on a proposal you will open a collapsable
window (click another time on the proposal to close it). This window shows the proposal's course of study, the
expiration date and a button that will open a modal containing all the proposal information. From this modal you can
go to the **application page** using the **"Apply"** button.

The button to show the proposal details is disabled in case you already have an 
"<span style="color:green">ACCEPTED</span>" or a "<span style="color:yellow">PENDING</span>" application.

<img src="guideImages/propsList.png" alt="drawing" width="500"/>

### 4.2 Apply For A Thesis Proposal <a name="apply"/>

The application page shows information about you and your university career. The page offers you the possibility to
attach a **PDF document** (your CV for example).
You can send your application with the "Apply" button at the end of the page, then you'll get a message based on the
application outcome.

<img src="guideImages/apply.png" alt="drawing" width="500"/>

### 4.3 My Applications <a name="apps"/>

In this page you can see your applications with the respective information, especially the **"status"**
that could be:
- PENDING, the proposal supervisor hasn't managed your application yet.
- REJECTED, your application has been rejected by the supervisor.
- CANCELLED, the professor has chosen another applicant, the proposal is expired, or 
it has been archived by the professor so your application has been indirectly rejected.
- ACCEPTED, your application has been accepted by the supervisor.

<img src="guideImages/studentApplications.png" alt="drawing" width="500"/>

### 4.4 New Thesis Request <a name="newthesisrequest"/>

If you want to make a **new thesis request** this is the right place. This page offer you the possibility to create a
thesis request compiling a short form with some mandatory fields, the title and supervisor. Once you have compiled the
form click the submit button to send the request. If you miss one of the mandatory fields you will be warned by some
alert.

<img src="guideImages/newThesisRequest.png" alt="drawing" width="500"/>

### 4.5 My Thesis Request <a name="mythesisrequest"/>

This page shows your thesis request (if you have one) and gives oyu the possibility to edit it clicking the button:
**"enable edit mode"**, by this way you can modify the request's data or delete the request. Remember to submit the
changes clicking the button **"Modify request"**.

<img src="guideImages/myThesisRequest.png" alt="drawing" width="500"/>

### 4.6 Forum <a name="forumstud"/>

## 5 Are you a professor? <a name="professor"/>

From the main page you can choose between three options each with its own button which will redirect you to the
appropriate page:

- Add a new thesis proposal
- My thesis proposals
- Archive

In every moment you can change page or logout browsing the **menu** in the top right part of the pages.

<img src="guideImages/professorMain.png" alt="drawing" width="500"/>

### 5.1 Add A New Thesis Proposal <a name="add"/>

This page contains the form to add a **new proposal**. You can add your new thesis proposal filling the form and
submitting it. Pay attention, before you submit the form make sure that the **mandatory fields** (marked with an "*")
are filled otherwise an error alert will arise and the submission won't be accepted. The other fields are all optional.
Note that for some fields like Co-supervisors (internal and external), Research Groups, Keywords, and CdS you can add
**more than one element**.

<img src="guideImages/addForm.png" alt="drawing" width="500"/>

### 5.2 My Thesis Proposals <a name="props"/>

This page displays your thesis proposals and the respective application. From this page you are able to operate on your
personal proposals, in particular you can:
- **delete**
- **edit**, the edit feature consists in a modal working as the "add proposal page"
- **copy**, maybe changing some field before
- **manually archive** 

Clicking the proposals you'll see its applications with the information about the candidate, for each candidate you can
download the attached file. You can **accept** one of the applications, this action will consequently make other
applications cancelled.

<img src="guideImages/professorProposal.png" alt="drawing" width="500"/>

### 5.3 Co-supervised Proposals <a name ="cosupervised"/>

Here you will find all the proposals where you are assigned as a co-supervisors. This is a read-only page.

<img src="guideImages/cosupervisedProposals.png" alt="drawing" width="500"/>

### 5.4 Archive <a name ="archive"/>

All the expired, manually archived and assigned proposals goes here. Each proposal has a modify button which permits
you to edit and then restore an archived proposal.

<img src="guideImages/archive.png" alt="drawing" width="500"/>

### 5.5 Pending Requests <a name ="pendingrequests"/>

### 5.6 Archived Requests <a name ="archivedrequests"/>

### 5.7 Forum <a name ="forumprof"/>

## 6 Are you a secretary? <a name ="secretary"/>

From the main page at th moment you can choose only one options which will redirect you to the appropriate page:

- Requested proposals

In every moment you can change page or logout browsing the **menu** in the top right part of the pages.

<img src="guideImages/secretaryMain.png" alt="drawing" width="500"/>

### 6.1 Requested proposals <a name ="requestedproposals"/>

You can see all the requested thesis proposals made by the students each with the information about the proposal and the
applicant. From this page you can accept or reject a proposal request.

<img src="guideImages/requestedProposals.png" alt="drawing" width="500"/>
