const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/db')
const connectCloudinary = require('./config/cloudinary');
const adminRouter = require('./routes/adminRoute');
const doctorRouter = require('./routes/doctorRoute');
const userRoute = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 4000

// fl6ioxLXPLClFdR9

app.use(express.json());
app.use(cors());

dbConnect();
connectCloudinary();

app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter);
app.use('/api/user',userRoute);

app.get('/', (req,res)=>{
    res.send("API working")
})

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})