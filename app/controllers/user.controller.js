exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.")
}

exports.userBoard = (req, res) => {
  res.status(200).send("User content")
}

exports.adminBoard = (req, res) => {
  res.status(200).send("admin content")
}

exports.modaratorBoard = (req, res) => {
  res.status(200).send("moderator content")
}