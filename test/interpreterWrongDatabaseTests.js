var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter Wrong Database", function () {

    var db = [
        "varon(juan).",
        "varon",
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.validateDataBase(db);
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Wrong Database Facts', function () {

        it('varon(juan) should be false', function () {
            assert(interpreter.checkQuery('varon(juan)') === false);
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be false', function () {
            assert(interpreter.checkQuery('mujer(cecilia)') === false);
        });

        it('padre(juan, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === false);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

    });

    describe('Interpreter Wrong Database Rules', function () {

        it('hijo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === false);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be false', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === false);
        });

    });


});


