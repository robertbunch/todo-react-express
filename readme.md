# A toDo app, built in React and Express/MySQL
## Purpose: A React app that uses react-router and AJAX to interact with an Express API connecting to MySQL for AWS deployment course students.

### Overview
The React portion was built with [create-react-app](https://github.com/facebookincubator/create-react-app), and the express app with the [express-generator](https://expressjs.com/en/starter/generator.html). [React-Router 4](https://reacttraining.com/react-router/web/guides/philosophy) serves for navigating between the home page, edit, and delete pages.

A basic database with seed data is included. There is no user system.

A config file is neccessary for the API to function. This file contains the database configuration and should not be commited. It follows the following format:
```
var config = {
	db:{ 
		host: '127.0.0.1',
		user: 'x',
		password: 'x',
		database: 'todo'
	}
}
module.exports = config
```

##Steps to deploy:
###Back-end
1. Clone the repository to AWS
2. Enter the back-end folder
3. npm install
4. Use FTP or scp to add the config file to the config folder
5. Import the database to mysql
6. Add a user and grant access to the database
7. Test with nodemon or like process manager
8. Once you are test free, use pm2 to start bin/www
9. Note the port you have chosen to run on

###Front-end
1. Clone the repository to local
2. Enter the front-end folder
3. npm install
4. Change the apiAddress variable in public/index.html to your ip address/url of your express server and the correct port number (noted above)
5. npm run build to create a build folder
6. Use FTP or scp to move the build folder to AWS

It is the bones of the [materialize css](http://materializecss.com/) starter theme. 

### Technologies Used
* React
* create-react-app
* node.js
* express.js
* mysql
* materializecss

### Notes
The code is lightly commented, generally assuming you know react. The purpose is to create a single-page app that interacts with a node.js api for deployment.

