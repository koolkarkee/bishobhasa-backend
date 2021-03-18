const Mongodb = require('mongodb')
const Client = Mongodb.MongoClient
const ConnectionUrl = 'mongodb://127.0.0.1:27017'
const DbName = 'bishobhasa' 

module.exports = {
    mongodb: Mongodb, client: Client, connectionUrl: ConnectionUrl, dbName: DbName
}