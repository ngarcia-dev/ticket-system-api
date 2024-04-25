import Jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "15m" },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};
