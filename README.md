# ExtremeResults Web App

![Travis Build Status](https://travis-ci.org/bjaanes/ExtremeResults-WebApp.svg?branch=master)

A web app for Extreme Results.
Extreme Results is implement the systems proposed in the book 'Getting Results the Agile Way'.

The app is built using Angular and uses Parse as back-end.
More details about setting the app up on your own is coming soon.

All documents for the project is located on this Evernote notebook:
https://www.evernote.com/pub/bjaanes/extremeresults


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

