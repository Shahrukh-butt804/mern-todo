import jwt from "jsonwebtoken";
import { User } from "../models/userModels/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorized Error");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "unauthorized Access Token");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(401, error?.message || "Invalid Acces token");
  }
});
