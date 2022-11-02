const {
  client,
  getAllUsers, // new
} = require("./index");

async function testDB() {
  try {
    // connect the client to the database, finally
    client.connect();

    // queries are promises, so we can await them
    const users = await getAllUsers();
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}

testDB();
