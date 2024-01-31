const { MongoClient } = require('mongodb')

const MONGODB_URI = 'mongodb+srv://ctroubit:Group44OSSI@ossi44.hvbfqvj.mongodb.net/'
let dbConnect;

module.exports = {
    connectToDb: (cb) =>{
        MongoClient.connect(MONGODB_URI)
            .then((client) => {
            dbConnect = client.db('login')
                return cb()
        }).catch(err =>{
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnect
}