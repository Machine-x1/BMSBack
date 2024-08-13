import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define    secret key for signing the JWT
const SECRET_KEY = "ZXCMKASD98741231!@#!@#@#$askdjnakjn";

// Function to generate a JWT
const generateJWT = (username: string) => {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
};

export const loginAuth = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (username === "superadmin@admin.com" && password === "ZXCMSDO!@E!@#$%YTHGFGF#$T%YTHBCVXZCDASRWETYTHGBCVZCS@#$") {
      const token = generateJWT(username);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Middleware to verify the JWT
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // Add the decoded user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
};