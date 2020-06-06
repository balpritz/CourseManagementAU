<h1 align="center">
<img width="40" valign="bottom" src="https://i.ibb.co/hDQWNMr/accolite-logo.png">
MS AU Course Management Portal
</h1>
<h4 align="center">MS-AU management portal dealing with course management developed using Angular, Spring Boot, MySQL
</h4>

---

[Setup and install](#setup-and-install) | [Features](#features) | [Resources](#resources)

## Setup and install

Fork this repo from inside GitHub so you can commit directly to your account, or simply download the `.zip` bundle with the contents inside.

#### Recommended tools
* [Visual Studio Code](https://code.visualstudio.com/download): For managing the frontend part of the application
* [Eclipse IDE](https://www.eclipse.org/downloads/): For managing the backend part of your application
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/): For setting up the database

#### Dependency installation

While trying to reproduce this project, you'll need development dependencies of which run on Node.js, follow the steps below for setting everything up (if you have some of these already, skip to the next step where appropriate):

1. Download and install [Node.js here](https://nodejs.org/en/download/) for
   Windows or for Mac.

That's about it for tooling you'll need to run the project, let's move onto the project install.

#### Project installation and server

Now that you've pulled down the repo and have everything set up, using the terminal you'll need to `cd` into `./frontend/course-mgmt-sys-AU` of the directory that you cloned the repo into and run some quick tasks:

```
cd <./frontend/course-mgmt-sys-AU>
yarn install
# OR
npm install
```

Then go back to the root directory and `cd` into `./backend/course-management-system` directory to build the Spring Boot Project in order to set up all the Maven dependencies. 

This will then set up all the development and production dependencies we need. All that is left, is to boot up all the servers that are required.

1. To boot up the server for your Angular application, `cd` into `./frontend/course-mgmt-sys-AU` and run the following command:

```
yarn start
# OR
npm start
# OR
ng serve
```

Visit `localhost:4200` to view the application.

2. To boot up your backend server in order to activate your endpoints to service, RESTful API requests, open up the `./backend/course-management-system` repository in Eclipse and run it as a Java application.

Visit `localhost:8080` to interact with the end-points using [Postman](https://www.postman.com/downloads) or any other API testing utility if need be.

3. Finally, open up MySQL workbench, to start the database server. `NOTE`: Do, configure the application properties of the Java project to connect with your database server.

You're good to go now! Start using the portal at `localhost:4200`.

## Features

* Users can `sign-in` using their google email Ids or with an already registered email. `NOTE`: Only those from `@accoliteindia.com`  domain name are allowed to sign-in using google.

<div align="center"><img src="https://i.ibb.co/F5qXrtr/login-page.png" alt="login-page" border="0"></div>

* Once you're logged in, you are redirected to the `home page` which displays certain statistics related to the platform as well as the logged user.

<div align="center"><img src="https://i.ibb.co/frgWPb2/home-page.png" alt="home-page" border="0"></div>

* The `new-course page` allows a user to add a new course to the Accolite University training program.

<div align="center"><img src="https://i.ibb.co/nq29tcQ/new-course.png" alt="new-course" border="0"></div>

* The `edit-courses page` allows a user to edit any of the courses he/ she might have created. The actions include: `updating` the course details, `change` course status, `delete` a course, and `view` a list of all users enrolled in that course. 

<div align="center"><img src="https://i.ibb.co/g7NLG9x/edit-courses.png" alt="edit-courses" border="0"></div>

* On the `participant-list page` for a specific course, the instructor has the option to `mail` any particular participant or all of them, if need be. Clicking on the mail icon opens up the default mailing application on the user's system pre-populated with the recipient list.

<div align="center"><img src="https://i.ibb.co/C6Dg8B3/participant-list.png" alt="participant-list" border="0"></div>

* The `view-courses page` lists out all the courses registered on the platform with details about the `status` of the course and `instructor details`. The `view` button allows the user to view the `course main page`. 

<div align="center"><img src="https://i.ibb.co/F03DqjX/view-courses.png" alt="view-courses" border="0"></div> 

* On the `course main page`, the user can `view` the complete `course description`, `pre-requisites`, `skills acquired` and other useful information such as `average course ratings`, the `number of trainees enrolled`, and the `feedback` provided by those enrolled for the course. You have the option to `mail` the instructor by clicking on the mail icon placed next to the instructor's name, view the `training material` for the course by clicking the Github icon placed next to the course title, `enroll` for a course using the enroll button, and provide your own feedback for the course if enrolled.

<div align="center"><img src="https://i.ibb.co/KjvpF4q/course-mainpage.png" alt="course-mainpage" border="0"></div>

* Finally, you can use the `search bar` on the navigation header to search for a particular course of your liking.

<div align="center"><img src="https://i.ibb.co/9ghb9gd/search-results.png" alt="search-results" border="0"></div>

## Resources

There are several resources used inside this project, of which you can read
further about to dive deeper or understand in more detail what they are:

* [Angular](https://angular.io)
* [npm](https://www.npmjs.com/)
* [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [MySQL workbench](https://dev.mysql.com/doc/workbench/en/)
