const { use } = require("passport");
const UserModel = require("../models/user"); // Ensure this path is correct


exports.addUser= async (req, res) => {
    try {
        console.log(req.body)
      const {username,email,password,role } = req.body;
      
      const user = new UserModel({
        username,
        email,
        password,
        role
      });
  
      const savedDoc = await user.save();
      console.log("user added successfully", savedDoc);
      res.status(200).json("user added successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred, please try again later." });
    }
  };
exports.login= async (req, res) => {
    try {
        const {username,password } = req.body;
        // Check if user exists
        const user = await UserModel.findOne({ email: username});
        console.log(user)
        if (!user) {
          return res.status(400).send('User not found');
        }
        let isMatch = false;
        if(password===user.password){
            isMatch=true;
        }
        if (!isMatch) {
          return res.status(400).send('Incorrect password');
        }
        // If password matches, set user information in session
        res.status(200).json("login successful");
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
};
 
exports.listAll = async (req, res) => {
    try {
      let allFood=await UserModel.find({});
      res.status(200).json(allFood);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred, please try again later." });
    }
  };
