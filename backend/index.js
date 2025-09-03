const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/db');
const connectCloudinary = require('./config/cloudinary');
const adminRouter = require('./routes/adminRoute');
const doctorRouter = require('./routes/doctorRoute');
const userRoute = require('./routes/userRoute');
const { webhookRouter } = require('./controller/userController');

const app = express();
const PORT = process.env.PORT || 4000;

// --- Stripe webhook MUST come first & use raw body ---
app.use('/stripe', webhookRouter);

// --- Normal middlewares ---
app.use(cors());
app.use(express.json());

dbConnect();
connectCloudinary();

app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRoute);

app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
