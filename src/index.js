const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
const profile = require('./routes/profile'); 


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))


app.use('/profile',profile)

// app.post('/profile',async function (req, res) {
//     let collection = await db.main();
//     let profile = req.body;
//     delete profile._id;
//     let id = await collection.insertOne(profile)
//     let newEntry = await collection.findOne({'_id':id.insertedId})
//     response.data = newEntry;
//     response.message = "success";
//   res.send(response)
// })

// app.delete('/profile/:email', async function (req, res) {
//     let collection = await db.main();
//     let email = req.params.email;
//     let deletedId = await collection.deleteMany({'email':email});
//     response.data = deletedId.acknowledged;
//     response.message = 'success';
//   res.send(response)
// })

// app.get('/profile/:email', async function(req,res){
//   let collection = await db.main();
//   let email = req.params.email;
//   let obj = await collection.findOne({'email':email});
//   response.data = obj;
//   response.message = 'success';
// res.send(response)
// })

app.listen(3000, () => {
    console.debug('App listening on :3000');
});