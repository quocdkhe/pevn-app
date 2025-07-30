// controllers/user.controller.ts
import { Request, Response } from "express";
import prisma from "../config/prisma.config";
import { hashPassword, verifyPassword } from "../utils/password.util";
import generateToken from "../utils/token.util";
import type {
  UserLogin,
  UserRegistration,
  UserUpdate,
} from "../schemas/user.schema";

const registerUser = async (
  request: Request<{}, {}, UserRegistration>,
  response: Response
) => {
  const { email, name, password } = request.body;
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return response.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);
  // Create new user
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return response.status(201).json({
    message: "User registered successfully",
  });
};

const authUser = async (
  request: Request<{}, {}, UserLogin>,
  response: Response
) => {
  const { email, password } = request.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user || !(await verifyPassword(password, user.password))) {
    response.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }
  generateToken(response, user.id);
  response.status(200).json({
    message: "Login successful",
    name: user.name,
    email: user.email,
    id: user.id,
  });
};

const logoutUser = (request: Request, response: Response) => {
  response.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return response.status(200).json({ message: "Logged out successfully" });
};

const getUserProfile = async (request: Request, response: Response) => {
  //@ts-ignore
  response.status(200).json(request.user);
};

const updateUserProfile = async (
  request: Request<{}, {}, UserUpdate>,
  response: Response
) => {
  //@ts-ignore
  const userId = request.user.id;

  let { name, password } = request.body;

  const dataToUpdate: UserUpdate = { name };

  if (password) {
    dataToUpdate.password = await hashPassword(password);
  }

  await prisma.user.update({
    where: { id: userId },
    data: dataToUpdate,
    select: { id: true, email: true, name: true },
  });

  return response.status(200).json({
    message: "User updated successfully",
  });
};

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
