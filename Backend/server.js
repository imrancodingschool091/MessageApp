import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import Router from "./Routes/user.route.js"
import path from "path"



const app=express()
dotenv.config()


//middleware

app.use(express.json())
app.use(cors())


const PORT=process.env.PORT ||8080



//database connction code..


const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

// Call the database connection function
connectDB();





//Routes

app.use("/user",Router)


// Deployment code
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "Frontend", "dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}





app.listen(PORT,()=>{

    console.log(`the app is listning on port :${PORT}`)
})