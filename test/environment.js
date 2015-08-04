/**
 * //@by_rcmonitor@//
 * on 04.08.2015.
 */

require('chai').should();

var hpg = require('../index.js');
var Environment = hpg.Environment;

describe('environment functional tests', function(){

	describe('#set test', function(){
		it('should set test environment', function(){
			Environment.setTest();
			
			var strEnvironment = process.env.NODE_ENV;
			strEnvironment.should.be.a('string');
			strEnvironment.should.equals(Environment.types.test);
		});
		
		it('should set development environment', function(){
			Environment.setDevelopment();
			
			var strEnvironment = process.env.NODE_ENV;
			strEnvironment.should.be.a('string');
			strEnvironment.should.equals(Environment.types.development);
		});
		
		it('should set production environment', function(){
			Environment.setProduction();
			
			var strEnvironment = process.env.NODE_ENV;
			strEnvironment.should.be.a('string');
			strEnvironment.should.equals(Environment.types.production);
		});
	});


	describe('#check test', function(){
		it('should be a test environment', function(){
			process.env.NODE_ENV = Environment.types.test;

			var boolRight = Environment.isTest();
			boolRight.should.be.a('boolean');
			boolRight.should.be.true();

			var boolNotRight = Environment.isDevelopment();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();

			boolNotRight = Environment.isProduction();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();
		});

		it('should be a development environment', function(){
			process.env.NODE_ENV = Environment.types.development;

			var boolRight = Environment.isDevelopment();
			boolRight.should.be.a('boolean');
			boolRight.should.be.true();

			var boolNotRight = Environment.isTest();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();

			boolNotRight = Environment.isProduction();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();
		});

		it('should be a production environment', function(){
			process.env.NODE_ENV = Environment.types.production;

			var boolRight = Environment.isProduction();
			boolRight.should.be.a('boolean');
			boolRight.should.be.true();

			var boolNotRight = Environment.isTest();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();

			boolNotRight = Environment.isDevelopment();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();
		});

	});

	describe('set-check test', function(){
		it('should set and check test environment', function(){
			Environment.setTest();
			var boolRight = Environment.isTest();

			boolRight.should.be.a('boolean');
			boolRight.should.be.true();

			var boolNotRight = Environment.isDevelopment();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();

			boolNotRight = Environment.isProduction();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();
		});

		it('should set and check development environment', function(){
			Environment.setDevelopment();
			var boolRight = Environment.isDevelopment();

			boolRight.should.be.a('boolean');
			boolRight.should.be.true();

			var boolNotRight = Environment.isTest();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();

			boolNotRight = Environment.isProduction();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();
		});

		it('should set and check production environment', function(){
			Environment.setProduction();
			var boolRight = Environment.isProduction();

			boolRight.should.be.a('boolean');
			boolRight.should.be.true();

			var boolNotRight = Environment.isDevelopment();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();

			boolNotRight = Environment.isTest();
			boolNotRight.should.be.a('boolean');
			boolNotRight.should.be.false();
		});

	})
});
