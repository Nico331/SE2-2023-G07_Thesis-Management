# SE2-2023-G07_Thesis-Management
Final project of the Software Engineering II course.

## Prerequisites

Before you begin, make sure you have installed:

- Docker
- Docker Compose

## Installation and Execution

Follow these steps to install and start the project.

### Starting the Database

1. Navigate to the project directory and run:
```
   docker-compose up
```

After that you should login as Student or as Professor:

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

If you want to test the notifications, you should change email settings in the backend service using your smtp settings. 
In alternative you can go to the mail_server package and run:
```
   docker-compose up
```
But you should change permissions of some files.
Then you should create email domains for the students, professors and external co-supervisors in the admin page ("localhost"). And then their mail boxes. Finally you should be able to access like a user in the page "localhost/sogo".

But the simplest way to test the notifications is to open the backend container and see the log, every sent email (also if failed because of the lack of the smtp server settings) will be printed in the log. 
