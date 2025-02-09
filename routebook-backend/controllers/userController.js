import User from "../models/User.js";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

const login = async (req, res) => {
  try {
    // validate request body
    if (!req.body.username || !req.body.password) {
      return res
        .status(404)
        .json({ message: "Error: username/password field not found" });
    }

    // search for user
    const searchUser = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (searchUser === null) {
      return res.status(400).json({ message: "Error: failed to authenticate" });
    }

    dotenv.config();
    const token = jsonwebtoken.sign(
      { username: req.body.username },
      process.env.JWT_KEY,
      {
        expiresIn: 60 * 60,
        issuer: "https://localhost:5173/api/auth",
        audience: "https://localhost:3000/login",
      }
    );
    return res.status(200).json({ message: token });
  } catch (err) {
    console.log(`Error in login function - ${err.message}`);
    return res.sendStatus(400);
  }
};

const signup = async (req, res) => {
  try {
    // validate request body
    if (!req.body.username || !req.body.password) {
      return res
        .status(404)
        .json({ message: "Error: username/password field not found" });
    }

    // check for unique username
    const searchUser = await User.findOne({ username: req.body.username });
    if (searchUser != null) {
      return res
        .status(400)
        .json({ message: "Error: A user with this username already exists" });
    }

    // save user
    const newUser = new User(req.body);
    await newUser.save();
    dotenv.config();
    const token = jsonwebtoken.sign(
      { username: req.body.username },
      process.env.JWT_KEY,
      {
        expiresIn: 60 * 60,
        issuer: "https://localhost:3001/api/auth",
        audience: "https://localhost:5173/login",
      }
    );
    return res.status(200).json({ message: token });
  } catch (err) {
    console.log(`Error in signup function - ${err.message}`);
    return res.sendStatus(400);
  }
};

export { login, signup };
