# GLCC Football Predictor

### Third Year Double Project for Benjamin Purvor

G20737032

## The Application

This applcation has been created as part of CO3808 as a double project. The application and platform as a whole are created using a MySQL database, an Express REST API, and a Next.js front-end web application. Designed to aid Gregson Lane Cricket Club in their fundraising efforts, the application has been built with close contact with the client, according to agile methodologies. The long-term aim of this platform is to encompass a significant portion of the clubs activities, improving the general ease of participation within the club.

## Accessing the Application

User accounts have been created in order to test the application, with the permissions for each account being related to the prefix of their username.

1. ```sh
       email: 'volunteer@glcc.uk'
       password: '#Volunteer_3yp!'
   ```

2. ```sh
       email: 'user@glcc.uk'
       password: '#User_3yp!'
   ```


## Running the application

In order to run this application, several commands are necessary.

- Before the application can compile and run, it is important to install the Node.js package requirements for both the Next.JS client-side application, and the RESTful API created for a server. In order to do so, you must first ensure an up-to-date version of Node.js is installed on your machine, then open a terminal and run the following two groups of commands.

1. ```sh
   $ cd client
   $ npm install
   ```
2. ```sh
       $ cd ../server
       $ npm install
   These commands will install a large number of dependencies that are required to both run and test the application.
   ```

Once installed, commands within the `package.json` files within both the server and client directories should be checked to ensure they are accurate. The commands are as follows.

1. Client Directory

```
"scripts": {
    "dev": "next dev"
}
```

2. Server Directory

```
"scripts": {
    "start": "concurrently \"npx tsc --watch\" \"nodemon -q ./dist/index.js\""
}
```

At the time of writing, these commands will create to localhost instances, one for the client - often at port 3000 - and one for the server - often at port 3001. In order to enter the instances, two more commands need to be run within the directories.

Within the client directory, it is required to run: `npm run dev`, and within the server directory, the command `npm start` is required. It is important to monitor the console output of these two commands, as they will alert you to the ports through which you can access the application.

These commands, as well as the separate applications' dependencies, should still reside in the `package.json` file within the .ZIP folder.

Should an error occur when running `npm start` in the server directory, it is often caused by the start script needing to be stopped and restarted. It appears to be an issue within the order in which commands are run through the package `concurrently`, however, a fix has not be established yet as it only affects the development environment and will not affect the deployed web application.

It is recommended to use Firefox's CTRL+Shift+M command to create a mobile display, or Chrome's dev tools to create a mobile emulator, as the application is built to function solely on mobile devices at this time.
