const db = require("../models");
const Role = db.role;

const initalSetup = async () => {
  const count = await Role.estimatedDocumentCount();
  if (count === 0) {
    console.log("count is: ", count);

    await new Role({
      name: "user",
    }).save();
    console.log("added 'user' to roles collection");

    new Role({
      name: "moderator",
    }).save();
    console.log("added 'moderator' to roles collection");

    new Role({
      name: "admin",
    }).save();
    console.log("added 'admin' to roles collection");
  }
};

module.exports = initalSetup;
