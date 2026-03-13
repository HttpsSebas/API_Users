import jwt from "jsonwebtoken"

export default function sessionMiddleware(req, res, next) {
  if (req.cookies.token) {
    req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
