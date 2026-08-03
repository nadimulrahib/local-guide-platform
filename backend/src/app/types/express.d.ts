import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      "include": ["src/**/*.ts", "src/**/*.d.ts"]
    }
  }
}