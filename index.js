const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const initalSetup = require("./app/libs/initialSetup");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connect to DB");
    initalSetup();
  })
  .catch((err) => {
    console.log("Connection error", err);
    process.exit();
  });

const app = express();

// Settings
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-urlencoded
app.use(express.urlencoded({ extended: false }));

// Welcome Route
app.get("/", (req, res) =>
  res.json({ message: "Welcome to the Fazt Auth API" })
);

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
