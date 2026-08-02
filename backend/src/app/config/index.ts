import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
};