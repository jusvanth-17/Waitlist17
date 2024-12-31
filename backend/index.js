require("dotenv").config();

import express, { json } from "express";
import db from "./config/mongoose";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import socketio from "socket.io";
const PORT = process.env.PORT || 8000;
import { findOne } from "./model/Room";
db();

//creating our app
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only requests from localhost:3000
  credentials: true,  // Allow sending credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
// cors to allow all  request
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: true,
  })
);

//creating a http server for socket io functinoaly else we can got with expres app

const server = require("http").Server(app);

// initializing socket
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

//decode the cookie if storing the jwt in cookie
app.use(cookieParser());

// to mkae user of json  request send in body by the user
app.use(json());

//encode and decode the session sotrage 
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//routes
app.use("/", require("./routes/index"));

//starting our server http 
server.listen(PORT, () => {
  console.log("server running on port", PORT);
});

// event based socket io connection 
io.on("connection", (socket) => {
  //conection user
  console.log(`Socket ${socket.id} connected`);

  //function to upadate the leaderboard realitme 
  socket.on("update-leaderboard", async (leaderboard) => {
    try {
      //get teh updated scores

      let scores = await findOne({ name: "LeaderBoard" }).populate({
        path: "users",populate: {path:"user" ,model: "User"}
      });
  

      console.log("scores.users sending scores" , "hey hello trying to update the score");
      //sendt it to the user
      io.emit("updated-leaderboard", scores);
    } catch (error) {
      console.log("scoket couldnt get scores", error);
    }
  });
  //cleanup 
  socket.on("disconnect", (socket) => {
    console.log(`socket ${socket.id} disconnected`);
  });
});
