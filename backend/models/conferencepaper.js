const mongoose = require('mongoose');

// Define the schema
const Schema = mongoose.Schema;

const ConferencePaperSchema = new Schema({
  paperName: {
    type: String,
    required: true
  },
  paperLocation: {
    type: String,
    required: true
  },
  paperAuthor:{
    type:String,
    required:true
  },
  reviewers: [{
    name: String,
    overallScore: Number,
    privateComments: String
  }],
  totalMarks:{
    type:Number
  },
  isApproved:{
    type:Boolean,
    required:true
  },
  overallReview:{
    type:String
  },
  paperState:{
    type:String,
    default:"draft",
    enum:['draft','published']
  },
  paperStatus:{
    type:String,
    required: true,
    enum: ['ACCEPTED','REJECTED','UNDER REVIEW']
  }
}, { timestamps: new Date() },); // Adding timestamps for creation and updates

// Create the model from the schema
const ConferencePaper = mongoose.model('ConferencePaper', ConferencePaperSchema);

module.exports = ConferencePaper;
