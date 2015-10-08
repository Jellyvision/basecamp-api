# Contributing to this module

I'm using [Mocha](https://mochajs.org/) as my test running and [Chai](http://chaijs.com/) as my assertion library.

In order to test the module, you simply need to run

```
npm test
```

This will start the `grunt` task that 

* Checks that everything passes JSHint
* Runs the Mocha tests

## Test API Client

Rather than maintain a Basecamp project for testing against and to avoid the time overhead of such an API, I'm using a 
Test API Client that mocks responses to requests.
It's based on a series of fixtures that represent each part of the API. Each fixture contains mock data and will provide
a list of the endpoints that it mocks (as well as implementations for each of those endpoints).