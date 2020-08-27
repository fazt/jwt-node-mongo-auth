const db = require("../models");
const Role = db.role;

const initalSetup = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      console.log('count is: ', count)
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};

module.exports = initalSetup;
