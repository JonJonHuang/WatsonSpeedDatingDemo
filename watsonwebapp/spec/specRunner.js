var Jasmine = require('jasmine')
var jasmine = new Jasmine()

// TODO - dont assume in watsonwebapp dir, use Path library to find config
jasmine.loadConfigFile('spec/support/jasmine.json')
jasmine.execute()
