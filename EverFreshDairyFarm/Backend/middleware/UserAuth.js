import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(422).json({ message: "Token not found." });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", tokenDecode);

    req.user = { id: tokenDecode.id };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default userAuth;
