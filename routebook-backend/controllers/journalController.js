import Journal from "../models/Journal.js";

const fetch = async (req, res) => {
  try {
    if (!req.query.username) {
      return res.status(404).json({ message: "Username required" });
    }
    const journals = await Journal.find({
      username: req.query.username,
    }).exec();
    if (journals && journals.length > 0) {
      return res.status(200).json(journals);
    } else {
      return res
        .status(404)
        .json({ message: "No journal with this username found" });
    }
  } catch (err) {
    console.log(`Error in fetch function - ${err.message}`);
    return res.sendStatus(400);
  }
};

export default fetch;
