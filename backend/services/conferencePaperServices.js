const PaperModel = require("../models/conferencepaper"); // Ensure this path is correct

exports.addPaper= async (req, res) => {
  try {
    const { paperName,paperLocation,paperAuthor,reviewers,totalMarks,isApproved,overallReview,paperState,paperStatus} = req.body;
    if(!totalMarks){
     totalMarks=findTotalMarks(reviewers);
    }
    const paper = new PaperModel({
      paperName,
      paperLocation,
      paperAuthor,
      reviewers,
      totalMarks,
      isApproved,
      overallReview,
      paperState,
      paperStatus
    });

    const savedDoc = await paper.save();
    console.log("paper added successfully", savedDoc);
    res.status(200).json("paper added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
 
//work from here

exports.listAll = async (req, res) => {
  try {
    let allPapers=await PaperModel.find({});
    res.status(200).json(allPapers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
exports.listAllRecent = async (req, res) => {
  try {
    let allPapers=await PaperModel.find({paperStatus:'UNDER REVIEW'});
    res.status(200).json(allPapers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
exports.getPaper = async (req, res) => {
  try {
    let id = req.body.id;
    let paper=await PaperModel.find({_id:id});
    console.log("results",paper)
    res.status(200).json(paper[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};

exports.addPaperReview= async (req, res) => {
  try {
    let paperId= req.body._id;
    const { OverallReview , paperState , isApproved,paperStatus,overallReview} = req.body;
    const updatedData ={
        OverallReview , 
        paperState , 
        isApproved,
        paperStatus,
        overallReview
    }
    const savedDoc = await PaperModel.findByIdAndUpdate(paperId,updatedData,{new:true})
    if(savedDoc){
        console.log("paper updated successfully", savedDoc);
        res.status(200).json("paper updated successfully");
    }
    else{
        res.status(404).json("paperId not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred, please try again later." });
  }
};
//should work on delete solt when a customer selects it.

exports.sendPaper = async (req, res) => {
    const paperId  = req.body.id;
    const filePath = `/Users/vignesh/Documents/ConferenceManagement4/conferenceManagement4/backend/paperpdfs/${paperId}.pdf`; // Adjust the path as necessary
    console.log(paperId)
    // Check if the file exists
    res.sendFile(filePath, (err) => {
        if (err) {
            // Handling the error when file does not exist or some other error
            console.log(err);
            res.status(404).send('File not found');
        } else {
            console.log('File sent:', filePath);
        }
    });
}

const findTotalMarks = (reviewers) => {
    let totalMarks=0;
    console.log(reviewers)
    for (let i in reviewers){
        totalMarks += reviewers[i].overallScore
    }
  return totalMarks;
  
};

