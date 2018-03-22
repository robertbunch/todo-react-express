# A toDo app, built in React/Redux and Express/MySQL
## Purpose: A React app that uses redux, react-router and AJAX to interact with an Express API connecting to MySQL for AWS deployment course students. [Find the course here](https://www.udemy.com/deploying-web-apps-simplified-quick-or-in-depth-on-aws)

### Overview
The React portion was built with [create-react-app](https://github.com/facebookincubator/create-react-app), and the express app with the [express-generator](https://expressjs.com/en/starter/generator.html). [React-Router 4](https://reacttraining.com/react-router/web/guides/philosophy) serves for navigating between the home page, edit, and delete pages. Redux does some simple application state management fot the notification section of the navbar.

A basic database with seed data is included. There is no user system.

A config file is neccessary for the API to function. This file contains the database configuration and should not be commited. It follows the following format, but you will need to update credentials and datbase name if they are different:
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

# Steps to deploy:
I assume you have already installed apache2, mysql, and node.js. See course if not.

## Back-end
1. Clone the repository to /var/www
2. Enter the back-end folder
3. npm install
4. Use FTP or scp to add the config file to the config folder and any other directory/files not in the repo
5. Import the database to mysql through UI or CLI
6. Add a user and grant access to the database
7. Test with nodemon or like process manager
8. Once you are bug free, set up virtual host to reverse proxy (see below) from port 80 to port you have chosen (this uses 8181)
9. Enable the site and restart apache
10. Test a get route in the browser (mine is /gettasks) to make sure the url is working
#### NOTE - if you get "Internal Server Error" at the webpage or other proxy errors, check /var/log/apache2/error.log. A nice way to check logs is to run:
```
tail -f /var/log/apache2/error.log
```
Tail will automatically print the last 10 lines of a file to the screen. -f will keep the print open so any changes to the file will print. You can clear the terminal on a Mac with cmd-k, and refresh the page. If you can't make any sense of the error, post what you find here.

11. After confirming your URL, use pm2 to start bin/www
12. Note the port you have chosen to run on (again, mine is running on 8181)
13. Make sure port 443 is open (for https) in the firewall
14. Run certbot to set up https and redirect all http traffic to http

Reverse Proxy for Express API
### Apache Reverse Proxy
```
<VirtualHost *:80>
    ServerName tdapi.ridiculous-inc.com
    <Location "/">
        ProxyPreserveHost On
        ProxyPass http://localhost:8181/
        ProxyPassReverse http://localhost:8181/
    </Location>
</VirtualHost>
```

### Certbot instructions
```
$ sudo apt-get update
$ sudo apt-get install software-properties-common
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install python-certbot-apache 
$ sudo certbot --apache
```

## IMPORTANT - Certbot is going through a major update right now, so the short hand command that I use in the first 3 sections (Front-end, React/Express, & Rails), is going to fail. You can use a much longer command (I mention it in the Flask section) for now to get it to work. Once Certbot stabilizes, I will update the video, if the old command doesn't work.

```
$ sudo certbot --authenticator standalone --installer apache -d cm.ridiculous-inc.com --pre-hook "systemctl stop apache2" --post-hook "systemctl start apache2"
```

Optional short explanation: You don't actually need the --pre-hook, or --post-hook commands, those will simply run immediately before and after certbot validates the domain. In this case, stop apache before, start apache after. The command also specifies the domain you want the cert for, as opposed to everything in your /etc/apache2/sites-available folder. For NGINX, just change the --installer to "nginx"


## Front-end
1. Clone the repository to local (it is possible to simply run the build on the server, but this will take up significant space as npm install will bring a truckload of modules with it)
2. Enter the front-end folder
3. npm install
4. Change the apiAddress variable in public/index.html to the https url of your express server (noted above)
5. npm run build to create a build folder (if for some reason you are running this inside another directory, see [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths))
6. Use FTP or scp to move the build folder to AWS
7. Setup the virtualhost
8. Run certbot (see above)

## Apache Virtual Host for front-end
```
<VirtualHost *:80>
    DocumentRoot /var/www/todoReact
    ServerName ridiculous-inc.com
    <Directory "/var/www/todoReact">
        allow from all
        AllowOverride All
        Order allow,deny
        Options +Indexes
    </Directory>
</VirtualHost>
```

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

