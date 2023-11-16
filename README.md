# SE2-2023-G07_Thesis-Management
Final project of the Software Engineering II course.

## Prerequisites

Before you begin, make sure you have installed:

- Docker
- Docker Compose
- Node.js and npm
- JDK (Java Development Kit) version 17 or newer
- Gradle

#### Is recommended to use Intellij Idea
## Installation and Execution

Follow these steps to install and start the project.

### Starting the Database

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

After that you should login as Student of as Professor:

students (the password is "password" for every user):
- s300001@studenti.polito.it
- s300002@studenti.polito.it
- s300003@studenti.polito.it
- s300004@studenti.polito.it
- s300005@studenti.polito.it

professors (the password is "password" for every user):
- p300001@polito.it
- p300002@polito.it
- p300003@polito.it
- p300004@polito.it
- p300005@polito.it
