import dotenv from "dotenv";
dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "token_secret";
export const UI = process.env.UI || "http://localhost:5173";
