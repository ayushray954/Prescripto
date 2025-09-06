const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbConnect = require("./config/db");
const connectCloudinary = require("./config/cloudinary");

const adminRouter = require("./routes/adminRoute");
const doctorRouter = require("./routes/doctorRoute");
const userRouter = require("./routes/userRoute");
const { webhookHandler } = require("./controller/userController");

const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  webhookHandler
);


app.use(cors());
app.use(express.json());

dbConnect();
connectCloudinary();


app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
