import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

//Read the token from the req
//Check if token is valid
export const authMiddleware = async (req, res, next) => {
  console.log("Auth middleware reached");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //["Bearer", Token]
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    //Verify and extract the user
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decode.id },
    });

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};
