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

1. To start the MongoDB container, navigate to the project directory where your `docker-compose.yml` file is located and execute:
```
   docker-compose up -d mongoDB
```
2. To start the server on windows:
``` 
    cd server
    .\gradlew build
    
```
