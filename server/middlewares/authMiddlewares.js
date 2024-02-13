const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["Authorization"];
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded);

    req.body.userId = decoded._id;

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    console.log("Headers:", req.headers);
    return res.status(401).send({ message: "Auth failed", success: false });
  }
  // try {
  //   const token = req.headers["authorization"].split(" ")[1];
  //   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //     if (err) {
  //       console.error("JWT verification error:", err);
  //       return res.status(401).send({ message: "auth failed", success: false });
  //     } else {
  //       console.log("Decoded token:", decoded);

  //       req.body.userId = decoded._id;
  //       next();
  //     }
  //   });
  // } catch (error) {
  //   console.error("Middleware error:", error);

  //   return res.status(401).send({ message: "auth failed", error: false });
  // }
};
