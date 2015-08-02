/**
 * //@by_rcmonitor@//
 * on 05.03.2015.
 */

var should = require('chai').should();

var hpg = require('../index.js');

describe('tests time-related functions of common helper', function(){


	describe('#diff() function test', function(){

		this.timeout(3000);

		it('should correctly calculate diff for timestamps', function(done){
			var time = new Date().getTime();

			setTimeout(function(){
				var diff = hpg.diff(time);
				diff.should.contain('1.5');
				done();
			}, 1520);
		})
	});

	describe('#time() function test', function(){
		it('should return readable representation of current time for empty parameter', function(){
			var strTime = hpg.time();
			strTime.should.be.a('string');
			strTime.should.contain('.');
		})
	})
});