import user from "../models/user.js";

const verifyAdmin = async (req, res, next) => {
  const requester = req.decodedEmail;
  const requesterAccount = await user.findOne({ email: requester });
  if (!requesterAccount.admin) {
    res.status(403).send({ message: "Forbidden access" });
  } else {
    next();
  }
};

export default verifyAdmin;
