# ExtremeResults Web App

![Travis Build Status](https://travis-ci.org/bjaanes/ExtremeResults-WebApp.svg?branch=master)
[![codecov.io](https://codecov.io/github/bjaanes/ExtremeResults-WebApp/coverage.svg?branch=master)](https://codecov.io/github/bjaanes/ExtremeResults-WebApp?branch=master)
<!--[![Code Climate](https://codeclimate.com/github/bjaanes/ExtremeResults-WebApp/badges/gpa.svg)](https://codeclimate.com/github/bjaanes/ExtremeResults-WebApp)-->
[![Dependencies](https://david-dm.org/bjaanes/ExtremeResults-WebApp.svg)](https://david-dm.org/bjaanes/ExtremeResults-WebApp)

A web app for Extreme Results.

Read all about the app and what it tries to solve here: http://www.gjermundbjaanes.com/xr/

If you want to give it a try, it is available here: https://xr.gjermundbjaanes.com

Extreme Results is trying to implement the systems proposed in the book 'Getting Results the Agile Way'.
Read more about Agile Results here: http://gettingresults.com/wiki/Explained_-_Agile_Results_in_a_Nutshell

Usually, you would implement Agile Results with pen and paper, or something simple like Evernote. I don't think that's good enough. I want to link everything togetether, making it easy so see the bigger picture.

## Screenshots

### Overview
![Overview](https://github.com/bjaanes/ExtremeResults-WebApp/raw/master/screenshots/Overview2.png "Overview")

### Outcomes
![Outcomes](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/Outcomes.png "Outcomes")

### Reflections
![Reflections](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/Reflections.png "Reflections")

## Technology

The app is built using Angular and a node server with RESTful API's on the backend.

The code the the server is located here:
https://github.com/bjaanes/ExtremeResults-Server

## Installation

### Requirements:

* Node.js with npm

### Setup

#### Install dependencies for building:
```bash
npm install
```


#### Build and run

To build:
```bash
npm run build
```

To build and run the application, you can just use
```bash
npm start
```


#### Test

To run the unit tests once
```bash
npm test
```


To run the e2e tests with protractor you can do the following:

Build production environment
```bash
npm run buildprod
```

Start the "production" server
```bash
npm run serveprod
```

Run the tests:
```bash
npm run e2e
```

