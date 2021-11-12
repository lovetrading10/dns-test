require("dotenv").config({ path: ".env" });

const JWT_SECRET = process.env.JWT_SECRET;
const ATLAS_URI = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

module.exports = { JWT_SECRET, ATLAS_URI, PORT };
