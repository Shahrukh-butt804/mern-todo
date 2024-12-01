import e from "cors";
import { User } from "../models/userModels/user.model.js";

async function register(req, res) {
  const { name, email, password } = req.body;
  //   console.log(name,email,password)

  try {
    const user = await User.create({ name, email, password });
    if (!user) throw new Error("Something went wrong while creating user");

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser)
      throw new Error("Something went wrong while creating user");

    res.status(200).send({
      message: "User created successfully!",
      createdUser,
    });
  } catch (error) {
    console.log("Something went wrong while creating user", error);
    res.status(500).send({
      message: "Something went wrong while creating user",
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await User.findOne({ email });
    // console.log(user)
    if (user?.password == password) {
      res.status(200).send({
        message: "Your are Logged In",
        user,
      });
    } else {
      res.status(401).send({
        message: "invalid credentials",
      });
    }



  } catch (error) {
    console.log("something went wrong while logging in", error);
    res.status(500).send({
      message: "something went wrong while logging in",
    });
  }
}

export { register, login };
