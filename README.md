# ExtremeResults Web App

![Travis Build Status](https://travis-ci.org/bjaanes/ExtremeResults-WebApp.svg?branch=master)
[![codecov.io](https://codecov.io/github/bjaanes/ExtremeResults-WebApp/coverage.svg?branch=master)](https://codecov.io/github/bjaanes/ExtremeResults-WebApp?branch=master)
<!--[![Code Climate](https://codeclimate.com/github/bjaanes/ExtremeResults-WebApp/badges/gpa.svg)](https://codeclimate.com/github/bjaanes/ExtremeResults-WebApp)-->
[![Dependencies](https://david-dm.org/bjaanes/ExtremeResults-WebApp.svg)](https://david-dm.org/bjaanes/ExtremeResults-WebApp)

A web app for Extreme Results.


Extreme Results is trying to implement the systems proposed in the book 'Getting Results the Agile Way'.
Read more about Agile Results here: http://gettingresults.com/wiki/Explained_-_Agile_Results_in_a_Nutshell

Usually, you would implement Agile Results with pen and paper, or something simple like Evernote. I don't think that's good enough. I want to link everything togetether, making it easy so see the bigger picture.

## Screenshots

### Overview
![Overview](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/Overview.png "Overview")

### Daily Outcome
![Daily Outcome](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/DailyOutcome.png "Daily Outcome")

### Weekly Outcome
![Weekly Outcome](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/WeeklyOutcome.png "Weekly Outcome")

### Weekly Reflection
![Weekly Reflection](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/WeeklyReflection.png "Weekly Reflection")

### Hot Spots
![Hot Spots](https://raw.githubusercontent.com/bjaanes/ExtremeResults-WebApp/master/screenshots/HotSpots.png "Hot Spots")

## Technology

The app is built using Angular and uses Parse as back-end.

It also uses Cloud Code hosted in Parse to be able to perform several calls.
All of that code is located here: https://github.com/bjaanes/ExtremeResults-CloudCode


To develop or deploy XR on your own, you need to set up your own project with Parse:
https://parse.com/

You also need the correct data structure. The structure can be found here:
[DATAMODEL.md](DATAMODEL.md)




## Installation

### Requirements:

* Node.js with npm

### Setup

#### Install dependencies for building:
```bash
npm install
```


#### Build and run

To build and run the application, you can just use
```bash
npm start
```


#### Test

To run the unit tests in a TDD matter
```bash
npm test
```

Otherwise you can run the tests from karma as you normally would.


To run the e2e tests with protractor you can do the following:

Start the selenium server
```bash
npm run selenium
```

Run the tests:
```bash
npm run e2e
```

