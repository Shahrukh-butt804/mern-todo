import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: [8, "Password is too short"],
      required: true,
    },
    refreshToken: {
      type: "string",
    },
  },
  { timestamps: true }
);


userScheema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(err);
  }
});


userScheema.methods.generateAccessToken = function () {
  try {
    const accessToken = jwt.sign(
      {
        _id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    return accessToken;
  } catch (error) {
    console.log("Access Token generation failed", error);
    throw new Error("Access token generation Failed");
  }
};

userScheema.methods.generateRefreshToken = function () {
  try {
    const refreshToken = jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { exporesIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return refreshToken;
  } catch (error) {
    console.log("error while genrating Refresh Token");
    throw new Error("Refresh Token Failed");
  }
};

userScheema.methods.checkPassword = async function (password) {

   try {
   const result = await bcrypt.compare(password,this.password)
    return result // true or false    

   } catch (error) {
    console.log("something went wrong while decrypting the password")
    throw new Error("password compairing failed")
   }

};

export const User = mongoose.model("User", userScheema);
