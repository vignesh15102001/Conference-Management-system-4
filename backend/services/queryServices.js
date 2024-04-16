const { use } = require("passport");
const QueryModel = require("../models/query"); // Ensure this path is correct


exports.addQuery= async (req, res) => {
    try {
       
      const {query,user,userType } = req.body;
      
      const queries = new QueryModel({
        query,
        user,
        userType
      });
  
      const savedDoc = await queries.save();
      console.log(" added successfully", savedDoc);
      res.status(200).json(" added successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred, please try again later." });
    }
  };

exports.listAll = async (req, res) => {
    try {
      let allquery=await QueryModel.find({});
      res.status(200).json(allquery);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "An error occurred, please try again later." });
    }
  };
