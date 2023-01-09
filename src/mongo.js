require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = process.env.CONNECTION_URL;
const databaseName = process.env.DATABASE_NAME;

const databaseNames = {
  USERS: "users",
  TASKS: "tasks",
};

// manually create id's
const id = new ObjectId();
// console.log(id);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log(`There was an error connecting to the serer: ${err}`);
  }

  // connect with our db
  const db = client.db(databaseName);

  //   const result = db
  //     .collection("users")
  //     .insertOne({
  //       name: "Nnaemeka",
  //       age: 21,
  //     })
  //     .then((res) => {
  //       console.log(res.acknowledged);
  //       console.log(res.insertedId);
  //     });

  //   db.collection("users").insertMany([
  //     {
  //       name: "salinha",
  //       age: 22,
  //     },
  //     {
  //       name: "Chidera",
  //       age: 22,
  //     },
  //   ]);

  //   db.collection(databaseNames.TASKS)
  //     .insertMany([
  //       {
  //         description: "I have finished solving the problem",
  //         completed: true,
  //       },
  //       {
  //         description: "Was not able to migrate to the new backend",
  //         completed: false,
  //       },
  //     ])
  //     .then((res) => {
  //       if (res.acknowledged) {
  //         console.log(`Acknowledged is ${res.acknowledged}`);
  //         console.log(`Also, the ids are ${res.insertedIds}`);
  //       }
  //     });

  // this is how you get the estimated count for a db collection
  // let cc = db.collection(databaseNames.TASKS).estimatedDocumentCount();
  // // async, so use .then
  // cc.then((res) => console.log(res));

  // const tt = db
  //   .collection(databaseNames.TASKS)
  //   .find({ completed: true })
  //   .toArray();
  // tt.then((res) => console.log(res));

  /* Updating a document*/
  // db.collection(databaseNames.USERS)
  //   .updateOne(
  //     { _id: new ObjectId("63b9104dab2d09a90bddd0eb") },
  //     {
  //       $set: {
  //         name: "Khalil",
  //       },
  //       $inc: {
  //         age: 20,
  //       },
  //     }
  //   )
  //   .then((result) => {
  //     console.log("The name has been updated", result);
  //   })
  //   .catch((result) => {
  //     console.log("There was an error updating the users name", result);
  //   });

  /* update many completed tasks to true*/
  // db.collection(databaseNames.TASKS)
  //   .updateMany(
  //     { completed: false },
  //     {
  //       $set: {
  //         completed: true,
  //       },
  //     }
  //   )
  //   .then((res) => {
  //     console.log("Fields updated successifully", res);
  //   })
  //   .catch((err) => {
  //     console.log("There was an error updating the documents", err);
  //   })
  //   .finally(() => {
  //     console.log("Connection disconnected");
  //   });

  /* Find the first five records and print their name and indexes */
  const firstFiveDocuments = db
    .collection(databaseNames.USERS)
    .find()
    .limit(5)
    .toArray();
  firstFiveDocuments.then((res) => {
    for (let elem of res) {
      const name = elem.name;
      const age = elem.age;
      console.log(`${name} is ${age} years old`);
    }
  });

  /* Delete records */
});
