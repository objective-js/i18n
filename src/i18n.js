var i18nHelper = function () {

    this.keys = [];

    this.translations = {};

    this.lang = null;

    this.loadingStatus = 'idle';

    this.namespace = '';

    this.nsSeparator = '.';

};

i18nHelper.prototype.init = function (config) {
    this.config = config;
};

i18nHelper.prototype.import = function (key) {
    if(this.namespace)
    {
        key = this.namespace + this.nsSeparator + key;
    }

    this.keys.push(key);

    return this;
};

i18nHelper.prototype.get = function(key) {

    if(this.loadingStatus === 'idle') {
        this.load();
    }
    return this.translations[key];

};

i18nHelper.prototype.setLang = function (lang) {
    this.lang = lang;
};

i18nHelper.prototype.with = function (namespace) {
    this.namespace = namespace;
};

i18nHelper.prototype.load = function () {

    if(this.loadingStatus === 'idle') {

        this.loadingStatus = 'loading';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.config.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        self = this;
        xhr.onload = function () {

            if (xhr.status === 200) {
                self.translations = JSON.parse(xhr.responseText);
                self.loadingStatus = 'loaded';
            }
            else {
                console.error('Translations loading failed.  Returned status of ' + xhr.status);
                self.loadingStatus = 'failed';
            }
        };

        xhr.send(encodeURI('keys=' + JSON.stringify(this.keys) + '&lang=' + this.lang));

    }

};
