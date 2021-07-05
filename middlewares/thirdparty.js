//morgan
const Morgan = require('morgan')

//use body parser
const BodyParser = require('body-parser')

//cors
const Cors = require('cors')
//const bodyParser = require('body-parser')

function load(app){
    app.use(Morgan('dev'))
    // app.use(bodyParser.urlencoded({ extended : false }));
    // app.use(BodyParser.json())  
    app.use(Cors())
    console.log('using cors >> ')
}

module.exports = {
    load
}