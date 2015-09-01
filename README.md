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

* Node.js

Install bower and karma-cli

```bash
npm install -g bower
```

```bash
npm install -g karma-cli
```

### Setup

#### Install dependencies for building:
```bash
npm install
```

```bash
bower install
```

```bash
webdriver-manager update
```

#### Build and run

To build and run the application, you can just use
```bash
gulp
```


#### Test

To run the unit tests in a TDD matter
```bash
gulp tdd
```

Otherwise you can run the tests from karma as you normally would.


To run the e2e tests with protractor you can do the following:

Start the selenium server
```bash
webdriver-manager start
```

Run the tests:
```bash
protractor protractor.conf.js
```

