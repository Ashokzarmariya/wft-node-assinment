const { Router } = require("express");
const authenticate = require("../middleware/authenticate");
const User = require("../modal/user.modal");
const router = Router();


router.get("/currentUser", authenticate, async (req, res) => {
  try {
    const user = await req.user;
    const currentUser = await User.findById(user.user._id).select("-passoword").lean().exec();
    console.log(user.user);
    user.user.password = null;

    return res.status(200).send(currentUser);
  } catch (error) {
    return res.status(401).send(error.message);
  }
});


router.get("/", async (req, res) => {
  try {
   

    const keyword = req.query.search || req.query.name || req.query.email || req.query.role || req.query.satus
      ? {
          $or: [
            { role: { $regex: req.query.role, $options: "i" } },
          { email: { $regex: req.query.email, $options: "i" } },
          { fisrt_name: { $regex: req.query.name, $options: "i" } },
          { last_name: { $regex: req.query.name, $options: "i" } },
          { status: { $regex: req.query.status, $options: "i" } },
          ],
        }
      : {};
    console.log(req.query);
    
    const users = await User.find(keyword);
    return res.status(200).send(users).select("-password");
  } catch (err) {
    return res.status(500).send(err.message);
  }
});



module.exports=router