const express = require("express");
const connect = require("./config/db");
const { signup, login } = require("./controller/auth");
const app = express();

app.use(express.json());

//main page
const mainpage = async (req, res) => {
  return res.status(200).send({ message: "api working fine" });
};
app.get("/", mainpage);

//athentication
app.post("/signup", signup);
app.post("/login", login)

//userController
const userController=require("./controller/user.controller")
app.use("/users", userController);




const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await connect();
  console.log("listening on port", port);
});
