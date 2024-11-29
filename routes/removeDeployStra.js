const mongoose = require("mongoose");
const User = require("../models/users");

const removeDeployStra = async (req, res) => {
  try {
    const strategyId = req.body.strategyId;
    const email = req.body.email;

    console.log("Received strategyId:", strategyId);

    // Convert strategyId to ObjectId for comparison
    const strategyObjectId = new mongoose.Types.ObjectId(strategyId);

    // Find the user by email
    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Debugging: Log existing DeployedData and DeployedStrategies
    console.log("DeployedData before:", user.DeployedData);
    console.log("DeployedStrategies before:", user.DeployedStrategies);

    // Remove strategy from DeployedData
    user.DeployedData = user.DeployedData.filter((data) => {
      console.log("Comparing:", data.Strategy, strategyObjectId);
      return !data.Strategy.equals(strategyObjectId);
    });

    // Remove strategy from DeployedStrategies
    user.DeployedStrategies = user.DeployedStrategies.filter((id) => {
      console.log("Comparing:", id, strategyObjectId);
      return !id.equals(strategyObjectId);
    });

    // Remove strategy associated with Spreadsheets
    user.Spreadsheets = user.Spreadsheets.filter((spreadsheet) => {
      console.log("Comparing:", spreadsheet.strategyId, strategyObjectId);
      return !spreadsheet.strategyId?.equals(strategyObjectId);
    });

    // Debugging: Log updated arrays before saving
    console.log("DeployedData after:", user.DeployedData);
    console.log("DeployedStrategies after:", user.DeployedStrategies);

    // Save updated user data
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Strategy removed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error removing strategy:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = removeDeployStra;
