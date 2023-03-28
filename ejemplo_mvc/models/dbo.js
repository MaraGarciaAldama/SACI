const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect()
    .then(() =>{ 

      console.log("Conexión a MongoDB: OK");
      // ya está conectado a la BD
      dbConnection = client.db(process.env.DB_NAME);

      return callback();
    })
    .catch((error) => {
      return callback(error);
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
