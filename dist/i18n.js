/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*var Ajv = require('ajv');
var ajv = new Ajv();
var validateConfiguration = ajv.compile({
    "title": "i18n",
    "type": "object",
    "properties": {
        "url": {
            "type": "string",
            "format": "uri"
        }
    },
    "required": ["url"]
});*/
var XMLHttpRequest = __webpack_require__(1).XMLHttpRequest;

var i18nHelper = function () {

    this.keys = [];

    this.translations = {};

    this.language = null;

    this.loadingStatus = 'idle';

    this.namespace = '';

    this.nsSeparator = '.';

    this._xhr = false;

};

i18nHelper.prototype.init = function (config)
{
    this.config = config;
    this._xhr = new XMLHttpRequest();
};

i18nHelper.prototype.import = function (key)
{
    if (this.namespace) {
        key = this.namespace + this.nsSeparator + key;
    }

    this.keys.push(key);

    return this;
};

i18nHelper.prototype.get = function (key)
{
    if (this.loadingStatus === 'idle') {
        this.load();
    }

    return this.translations[key];
};

i18nHelper.prototype.setLanguage = function (language)
{
    this.language = language;
};

i18nHelper.prototype.with = function (namespace)
{
    this.namespace = namespace;
};

i18nHelper.prototype.load = function ()
{
    if (this.loadingStatus === 'idle') {

       /* if (!validateConfiguration(this.config)) {
            console.error('Translations loading failed. Bad configuration.');
            self.loadingStatus = 'unreachable';
            exit();
        }*/

        this.loadingStatus = 'loading';

        this._xhr.open('POST', this.config.url);
        this._xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        self = this;
        this._xhr.onload = function () {
            if (self._xhr.status !== 200) {
                console.error('Translations loading failed. Returned status of ' + self._xhr.status);
                return 'failed';
            }

            self.translations = JSON.parse(self._xhr.responseText);
            return 'loaded';
        };

        this.loadingStatus = this._xhr.send(encodeURI('keys=' + JSON.stringify(this.keys) + '&language=' + this.language));
    }

};

module.exports = i18nHelper;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {XMLHttpRequest:XMLHttpRequest};

/***/ })
/******/ ]);