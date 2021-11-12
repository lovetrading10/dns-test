const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { JWT_SECRET, ATLAS_URI, PORT } = require("./util/base");

const app = express();
const port = PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.pluralize(null);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("✅ MongoDB database connection established!");
});

// routes
const userRouter = require("./routes/user");

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`🔷 Server is running on port: ${port}`);
});
