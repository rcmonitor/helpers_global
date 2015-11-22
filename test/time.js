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
			strTime.should.have.length(14);
		})
	});


	describe('#dateTime() function test', function(){
		it('should have correct format', function(){
			var strTime = hpg.dateTime();

			strTime.should.match(/^[\d]{4}\/[\d]{2}\/[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}\.[\d]{3}$/);
		})
	});


	describe('internationalization', function(){
		it('should correctly return months', function(){
			var strRuLongOctober = hpg.getMonthI18N(9);
			strRuLongOctober.should.equals('Октябрь');

//			var strEnLongDecember = hpg.getMonthI18N(11, "en-US");
//			strEnLongDecember.should.equals('December');

//			var strRuLongJanuary = hpg.getMonthI18N(0, "ru-RU", "long");
//			strRuLongJanuary.should.equals('Январь');
		});

		it('should correctly return days', function(){
//			var strRuLongSunday = hpg.getDayI18N(0);
//			strRuLongSunday.should.equals('Воскресенье');

			var strEngLongMonday = hpg.getDayI18N(1, "en-US");
			strEngLongMonday.should.equals('Monday');

			var strRuShortSaturday = hpg.getDayI18N(6, "ru-RU", "short");
			strRuShortSaturday.should.equals('Сб');

			var strEnShortWednesday = hpg.getDayI18N(3, "en-US", "short");
			strEnShortWednesday.should.equals("Wed");
		})
	})
});