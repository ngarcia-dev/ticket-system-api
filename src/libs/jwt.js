import Jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../conf/config.js";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    Jwt.sign(payload, TOKEN_SECRET, { expiresIn: "15m" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
