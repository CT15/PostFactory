# PostFactory

This application is built using the MEAN stack:
* MongoDB
* ExpressJS
* AngularJS
* Node.js

# Application Overview

This application allows its user to:
* create a new account
* login / logout of his/her account
* create a post (when logged in)
* like a post (when logged in)
* view his/her profile (bug not yet fixed)

# Setup Instruction

1. Make sure that you already have the following installed:
  * npm
  * Angular CLI
  * MongoDB
2. Clone the repository (using HTTPS: git clone https://github.com/CT15/PostFactory.git)
3. Open the terminal and run the daemon process to instantiate Mongodb service
  ```shell
  $ mongod
  ```
4. Open another tab of the terminal to run the node application
  ```shell
  $ cd PostFactory
  $ nodemon
  ```
  If you do not have **nodemon** installed, you can also run
  ```shell
  $ node app.js
  ```
