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
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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
