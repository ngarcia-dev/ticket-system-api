import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const accessToken = req.cookies["token"];

  if (!accessToken)
    return res.status(401).json({ error: "User not authenticated" });

  try {
    const validToken = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = validToken;
    if (validToken) return next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};
