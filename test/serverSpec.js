'use strict';

var expect = require('chai').expect;
var request = require('request');
var domain = 'http://localhost:4000';

describe('Database server', function() {

  describe('/set?somekey=somevalue', function() {
    var url = domain + '/set?somekey=somevalue';

    it('returns status code 200', function(done) {
      request.get(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
      
    });
  });

  describe('/set?somekey=somevalue', function() {
    var url = domain + '/get?somekey=somevalue';

    it('returns status code 200', function(done) {
      request.get(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });

    });
  });
});
