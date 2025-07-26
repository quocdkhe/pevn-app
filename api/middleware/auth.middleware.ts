import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma.config";

const jwtSecret = process.env.JWT_SECRET;

const protect = async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.jwt;

  if (!token) {
    response.status(401).send("No token provided");
    return;
  }

  try {
    if (!jwtSecret) {
      response.status(500).send("JWT secret is not defined");
      return;
    }
    const decoded = jwt.verify(token, jwtSecret) as { userId: number };
    // @ts-ignore
    request.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    next();
  } catch (error) {
    console.log(error);
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

export { protect };
