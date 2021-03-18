//morgan
const Morgan = require('morgan')

//use body parser
const BodyParser = require('body-parser');

//cors
const Cors = require('cors')

function load(app){
    app.use(Morgan('dev'))
    app.use(BodyParser.urlencoded({ extended : false }));
    app.use(BodyParser.json())  
    app.use(Cors())
    console.log('using cors >> ')
}

module.exports = {
    load
}