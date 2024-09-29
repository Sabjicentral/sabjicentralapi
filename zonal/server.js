import express from "express";
import env from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import morgan from "morgan";

env.config()

const port = process.env.PORT||4000
const app=express()

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// routes
const routeFiles = fs.readdirSync('./routes');
const routes = Array.from(routeFiles);
routes.forEach(async route => {
  const routeModule = await import(`./routes/${route}`);
  app.use('/api', routeModule.default);
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})

