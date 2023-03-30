const {MongoClient} = require("mongodb");
const { get } = require("mongoose");
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri)

let dbConnection;

module.exports = {
    connectToServer: function (callback){
        client.connect()
        .then(() =>{
            console.log("Conexion a MongoDB: OK");
            dbConnection = client.db(process.env.DB_BAME);

            return callback();
        })
        .catch((error) => {
            return callback(error);
        });
    },

    getDb: function(){
        return dbConnection;
    },
};