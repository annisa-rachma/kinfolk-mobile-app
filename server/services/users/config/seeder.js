const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://saaannisa15:E8TptRdnIR2ViNnr@h8-challenge.zfvtwti.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const hash = bcrypt.hashSync(password);
  return hash;
}

async function seedDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = client.db("c2-p3").collection("Users");

    collection.drop();

    const dataUser = [
      {
        username: "admin1",
        email: "admin1@mail.com",
        password: hashPassword("12345"),
        role: "Admin",
        phoneNumber: "0123456",
        address: "dimana saja",
      },
      {
        username: "admin2",
        email: "admin2@mail.com",
        password: hashPassword("12345"),
        role: "Admin",
        phoneNumber: "0123456",
        address: "dimana saja",
      },
    ];

    await collection.insertMany(dataUser);

    console.log("Database seeded! :)");
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
