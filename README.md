# NotesApp
This is the implementation of a note manager app based on MEAN stack technology.
The project uses MySQL, Express.JS, Angular and Node.JS

To run this project you will need npm package manager, MySQL and Angular CLI.

---------------------------------------------------------------------------------------------------------------
 To set up the database 
---------------------------------------------------------------------------------------------------------------
Install MySQL.
Then you need to start the MySQL Server and connect. to do this cd to /bin/ of your MySQL server and run mysqld
Then connect to the server by typing in the following command:

mysql -u root -p

Type in your MySQL root password.
Then open the MySQL Command Line Client. 
In MySQL Command Line Client type in the password you established during setup when you were installing MySQL.
The next step is to create a new user to be used specifically for this project, new database and set up the database, database tables and triggers 
by running the SQL script in MySQL Command Line Client. The syntax is:

source file_directory\file_name

Example of the above mentioned command: 
source C:\Users\UserName\Desktop\NotesApp\database-setup.sql

---------------------------------------------------------------------------------------------------------------
 To run the server app 
---------------------------------------------------------------------------------------------------------------
cd into the notes-server directory on your local hard drive and then run the command below:

npm install && npm start

---------------------------------------------------------------------------------------------------------------
 To run the client app 
---------------------------------------------------------------------------------------------------------------
cd into notes-client-app directory and then run the commands below:

npm install

ng serve --open
