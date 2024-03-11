import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../conf/config.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
      },
    });

    const accessToken = await createAccessToken({ id: user.id });
    res.cookie("access-token", accessToken, { httpOnly: true });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = await createAccessToken({ id: user.id });
    res.cookie("access-token", accessToken, { httpOnly: true });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("access-token");
  res.json({ message: "Logged out" });
};

export const profile = async (req, res) => {
  const token = req.cookies["access-token"];

  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const payload = jwt.verify(token, TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: {
          select: {
            role: true,
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.cookies["access-token"];

  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const payload = jwt.verify(token, TOKEN_SECRET);

    res.json(payload);
  } catch (error) {
    res.status(401).json({ error: "User not authenticated" });
  }
};
