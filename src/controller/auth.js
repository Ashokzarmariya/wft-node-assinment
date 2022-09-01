const User = require("../modal/user.modal");
var jwt = require('jsonwebtoken');
var passwordValidator = require('password-validator');


function isPresentSpacialChar(password) {
  let spacialChar = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/`
  for (let i = 0; i < spacialChar.length; i++){
    
    if (password.includes(spacialChar[i])) {
      return true
    }
    
  }
  return false;
}

function isPresentUppercase(password) {
  let uper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  

  for (let i = 0; i < uper.length; i++){
    
    if (password.includes(uper[i])) {
      return true
    }
    
  }
  return false;
}
function isValidLength(password) {
  if (password.length < 8) return false
  return true;
}



const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.SECERET_KEY,{ expiresIn: "720h" });
}

const signup = async (req, res) => {
  try {
    const isEmailExist =await User.findOne({ email: req.body.email });

    if (isEmailExist)
      return res.status(400).send({ message: "This email is already exist" });
    
    
    //passoword validation 
    let password = req.body.password.split("");
    if (!isValidLength(password) && !isPresentSpacialChar(password) && !isPresentUppercase(password)) return res.status(501).send({ message: "password validation wrong" })

    //mobile validation
    let mobile = req.body.mobile.toString();
    if(mobile.length<10)return res.status(501).send({ message: "mobile has to be atleast 10 digit" })
    


    let newUser = await User.create(req.body);
    let token = newToken(newUser);
    newUser.password = null;
    
    return res.status(200).send({ message:"successfully signup" });
  } catch (error) {
    return res.status(501).send({"signup error ":error});
  }
};


const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(501).send({ message: "user not exist" })
    
    const role = req.body.role;
    if(user.role!==role) return res.status(501).send({ message: "role not match" });
  
  const match = user.comparePassword(req.body.password);;
  if (!match) return res.status(501).send({ message: "wrong password or email" });

    const token = newToken(user);
    user.password = null;
  return res.status(200).send({message:"Logged in successfully",user,token})
  } catch (error) {
    return res.status(500).send({"login error":error})
  }
  

}






module.exports={signup,login}
