var assert = require('assert');
var expect = require('expect');
var sinon = require('sinon');

var i18nHelper = require('../src/i18n');

var XMLHttpRequestAPI = {
    open: function () {},
    setRequestHeader: function () {},
    onload: function () {},
    send: function () {}
};

describe('i18n', function() {

    // Unit test suit
    describe('#constructor', function() {
        var object = new i18nHelper();

        it('should set the keys to empty array', function() {
            assert.equal(0, object.keys.length);
        });
        it('should set the language to null', function() {
            assert.equal(null, object.language);
        });
        it('should set the loadingStatus to idle', function() {
            assert.equal('idle', object.loadingStatus);
        });
        it('should set the namespace to empty string', function() {
            assert.equal('', object.namespace);
        });
        it('should set the nsSeparator to point character', function() {
            assert.equal('.', object.nsSeparator);
        });
    });

    describe('#init', function() {
        it('should set the configuration', function() {
            var object = new i18nHelper();
            var config = {"url": 'http://fake.com'};
            object.init(config);
            assert.equal(config, object.config);
        });
    });

    describe('#setLang', function() {
        var object = new i18nHelper();

        it('should change the language value', function() {
            assert.equal(null, object.language);
            object.setLanguage('en_US');
            assert.equal('en_US', object.language);
            object.setLanguage('en_GB');
            assert.equal('en_GB', object.language);
        });
    });

    describe('#import', function() {

    });

    describe('#get', function() {

        describe('## fetching translations', function () {

            var object = new i18nHelper();
            object.config = {"url": 'http://fake.com'};

            var xhrMock = sinon.mock(XMLHttpRequestAPI);
            xhrMock.object.send = function () {
                return 'loaded';
            };
            object._xhr = xhrMock.object;

            var spy = sinon.spy(object, "load");

            it('should fetch translations form server on first call', function() {
                object.get('dummy');
                assert(spy.calledOnce);
            });

            it('should not fetch translations form server on second call', function() {
                object.get('dummy');
                assert(spy.calledOnce); // because already called before
            });
        });

        describe('## translation mapping', function () {

        });

    });

    describe('#with', function() {
        it('should change the translation namespace', function() {
            var object = new i18nHelper();
            object.with('blog')
            assert.equal('blog', object.namespace);
        });
    });

    describe('#load', function() {

    });
});
