import "dotenv/config"
import express  from "express";
import mongoose from "mongoose";
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from "./routes/main.js"
const app = express();
const PORT = process.env.PORT || 8000;

/* Middleware */

app.use(cors()); //helps us to share our info between clients
app.use(morgan('tiny')); //whenever we hit any kind of route it will actually login our terminal
app.use(cookieParser()); 
app.use(express.json());//it will enable our abality to work with json
app.use(express.urlencoded({extended:true}));

/* Routes */
app.use("/api", allRoutes)
/*whenever we go next middleware after this allRoutes 
  it go to next middleware as i mention belew*/

// error handler
// eslint-disable-next-line
app.use((err, _req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
});



const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_LOCALHOST_CONN);
      console.log('MongoDB Connected');
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});