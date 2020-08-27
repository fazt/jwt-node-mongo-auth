const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: String,
});

module.exports = model("Role", roleSchema);
