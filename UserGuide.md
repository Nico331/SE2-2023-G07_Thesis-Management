# Thesis Management System Guide

## Index

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)

## 1 Introduction <a name="introduction"></a>

Welcome to Polito Thesis Management System Prototype, the perfect solution to facilitate the thesis management for student and
professor of Politecnico of Turin.

## 2 Prerequisites <a name="prerequisites"></a>

Before you begin, make sure you have installed:

- Docker
- Docker Compose
- Node.js and npm
- JDK (Java Development Kit) version 17 or newer
- Gradle

Is recommended to use Intellij Idea

## 3 Installation and Execution <a name="installation"></a>

Follow these steps to install and start the system.

1. To start the MongoDB container, navigate to the project directory and run:
```
   docker-compose up -d mongoDB
```
2. To start the server:
``` 
    cd server
    ./gradlew build
    ./gradlew bootRun
```
3. To start the client:
```
    cd client
    npm install
    npm start
```

Now you are ready to start! let's take a look at the system's features and how to use them.

## 4 Login <a name="introduction"/>

First of all from the initial page you can log in with one of the following default username.

The **password** is "password" for all users, both professors and students.

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

## 5 Are you a student? <a name="introduction"/>

From the main page you can choose between two options each with its own button which will redirect you to the appropriate page:

- Search for a thesis proposal
- My proposals applications

In every moment you can change page browsing the **menu** in the top right part of the pages.

### 5.1 Search for a thesis proposal <a name="introduction"/>

This page presents on the right side the **list of available proposals** and on the left side the **filters board**.

Under the proposal list there's the **virtual clock**, changing its value the proposal list will show only the available
proposals according to the selected date.

Clicking the **rounded arrow** the list will be updated, maybe the proposal you are searching for has been just added. 

From the filters board you can search a specific proposal typing some keywords or selecting some filters (you can select
more than one options for each field)

You can scroll down the list searching for an interesting proposal. Clicking on a proposal you will open a collapsable
window (click another time on the proposal to close it). This window shows the proposal's course of study, the
expiration date and a button that will open a modal containing all the proposal information. From this modal you can
go to the **application page** using the "Apply" button.

#### 5.1.1 Apply for a thesis proposal <a name="introduction"/>

The application page shows information about you and your university career. The page offers you the possibility to
add a **document** (your CV for example).
You can send your application with the "Apply" button at the end of the page, then you'll get a message based on the
application outcome.

### 5.2 My proposals application <a name="introduction"/>

In this page your applications are listed and by clicking them you can see their information, especially the **"status"**
that could be:
- "PENDING", the proposal supervisor hasn't managed your application yet.
- "REJECTED", your application has been rejected by the supervisor.
- "ACCEPTED", your application has been accepted by the supervisor.

## 6 Are you a professor? <a name="introduction"/>

From the main page you can choose between two options each with its own button which will redirect you to the appropriate page:

- Add a new thesis proposal
- My thesis proposals

### 6.1 Add a new thesis proposal <a name="introduction"/>



### 6.2 My thesis proposals <a name="introduction"/>

This page displays your thesis proposals and the respective application. From this page you are able to delete or edit (the edit feature consists in a modal working as the "add proposal page") all your proposals. Clicking the proposals you'll see its applications with the information about the candidate. You can accept one of the applications and consequently reject others.
