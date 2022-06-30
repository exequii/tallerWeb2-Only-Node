//COGNITO
const USER_POOL_ID = "us-east-2_T9l6jcW60";
const CLIENT_ID = "545v6pj3vfe4116dva0jv97h86";
const POOL_REGION = 'us-east-2';

//MONGODB
const MONGO_URI = "mongodb+srv://nahuel-savedra:LC2TPLkDNrWyc3D0@cluster0.vvgvhhf.mongodb.net/taller";
const MONGO_DB = "";



const POOL_DATA = {
    UserPoolId: USER_POOL_ID,
    ClientId: CLIENT_ID
}

module.exports = {POOL_DATA, MONGO_URI, MONGO_DB};
