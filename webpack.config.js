module.exports = {
    entry: './src/i18n.js',
    output: {
        filename: './dist/i18n.js'
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
};