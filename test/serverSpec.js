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

  describe('/get?somekey', function() {

    it('returns status code 200', function(done) {
      var url = domain + '/get?somekey';
      request.get(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('returns value "spock" for the key "nimoy"', function(done) {
      var setUrl = domain + '/set?nimoy=spock';
      var getUrl = domain + '/get?nimoy';
      request.get(setUrl, function(error, response, body) {
        request.get(getUrl, function(error, response, body) {
          var data = JSON.parse(body);
          expect(data.nimoy).to.equal('spock');
          done();
        });
      });
    });

    it('returns value "kirk" for the key "shatner"', function(done) {
      var setUrl = domain + '/set?shatner=kirk';
      var getUrl = domain + '/get?shatner';
      request.get(setUrl, function(error, response, body) {
        request.get(getUrl, function(error, response, body) {
          var data = JSON.parse(body);
          expect(data.shatner).to.equal('kirk');
          done();
        });
      });
    });

  });
});
