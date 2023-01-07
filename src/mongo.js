require("dotenv").config();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connectionURL = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log(`There was an error connecting to the serer: ${err}`);
  }
  console.log("Connected correctly");
});
