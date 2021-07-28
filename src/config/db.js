const { MongoClient } = require('mongodb')

const url = 'mongodb://172.16.0.52:60002'
const client = new MongoClient(url)

const dbName = 'Onboarding_JayaSree'

module.exports = {
    async main() {
        await client.connect()
        const db = client.db(dbName)
        return db;
      }
}