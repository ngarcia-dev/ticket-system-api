import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../conf/config.js";

export const authRequired = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const validToken = jwt.verify(accessToken, TOKEN_SECRET);
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};
