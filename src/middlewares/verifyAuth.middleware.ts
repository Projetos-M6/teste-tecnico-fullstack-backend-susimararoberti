import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError, handleError } from "../errors/appError";

const verifyAuthMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(401, "Invalid Token");
    }

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError(401, "Invalid Token");
        }
        req.user = {
          id: decoded.sub,
        };

        next();
      }
    );
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, resp);
    }
  }
};

export default verifyAuthMiddleware;
