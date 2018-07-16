const loginRoute = require("./loginRoute");
const registerRoute = require("./registerRoute");
const newConfession = require("./newConfessionRoute");
const router = require("express").Router();
const setNewUserData = require("./setNewUserDataRoute");
const otherConfessions = require("./otherConfessionsRoute");
const publicConfession = require("./publicConfessionsRoute");
const myConfessions = require("./myConfessionsRoute");
const changeConfession = require("./changeConfessionRoute");
const deleteConfession = require("./deleteConfessionRoute");
router
  .use("/login", loginRoute)
  .use("/register", registerRoute)
  .use("/newConfession", newConfession)
  .use("/setNewUserData", setNewUserData)
  .use("/getOtherUsers", otherConfessions)
  .use("/checkPublic", publicConfession)
  .use("/myConfessions", myConfessions)
  .use("/changeConfession", changeConfession)
  .use("/deleteConfession", deleteConfession);
module.exports = router;
