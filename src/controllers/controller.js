let dbconfig = require('../config/db');
let apiResponse = {
    error:false,
    data:'',
    message:'success'
}


module.exports = {
    'getProfiles':async () => {
        let db = await dbconfig.main();
        let collection = await db.collection('profile');
        let profiles = await collection.find().toArray();
        if(!profiles){
            apiResponse.error = true;
            apiResponse.message = 'db connection failed'
        }else{
            apiResponse.data = profiles
        }
        return apiResponse;
    },
    'getProfileByEmail':async (email) => {
        let db = await dbconfig.main();
        let collection =  db.collection('profile');
        let profile = await collection.findOne({'email':email});
        if(!profile){
            apiResponse.error = true;
            apiResponse.message = 'db connection failed'
        }else{
            apiResponse.data = profile
        }
        return apiResponse;
    },
    'deleteProfile':async (email) => {
        let db = await dbconfig.main();
        let collection =  db.collection('profile');
        let profile = await collection.deleteMany({'email':email});
        if(!profile){
            apiResponse.error = true;
            apiResponse.message = 'db connection failed'
        }else{
            apiResponse.data = profile
        }
        return apiResponse;
    },
    'insertProfile':async (profile) => {
        let db = await dbconfig.main();
        let collection = db.collection('profile');
        //deleting the empty _id that comes from the frontend
        delete profile._id;
        let profileResp = await collection.insertOne(profile);
        let newprofile = await collection.findOne({'_id':profileResp.insertedId});
        if(!profileResp){
            apiResponse.error = true;
            apiResponse.message = 'db connection failed'
        }else{
            apiResponse.data = newprofile
        }
        return apiResponse;
    },

}