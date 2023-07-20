const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./connectMongoose");
const userModel = require("./models/user");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const app = express();
const fs = require("fs");
const uploadMiddleware = multer({ dest: "./uploads" });
const postModel = require("./models/Post");
const path = require("path");

const secret = "asdfewq432423wqr5jk43nk5j3n534wtt435345kmlkm";
const salt = bcrypt.genSaltSync(10);

//middlware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

connectDB();

//registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const userDoc = await userModel.create({
        username: username,
        password: bcrypt.hashSync(password, salt),
      });
      res.json(userDoc);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(400).json("Enter Credentials");
  }
});

//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await userModel.findOne({ username });
  if (userDoc !== null) {
    const valid = bcrypt.compareSync(password, userDoc.password);

    if (valid) {
      jwt.sign({ username, id: userDoc._id }, secret, (err, token) => {
        if (err) {
          throw err;
        }
        res
          .cookie("token", token)
          .json({ username: userDoc.username, id: userDoc.__id });
      });
    } else {
      res.status(400).json("error");
    }
  } else {
    res.status(400).json("error");
  }
});

//cookie validation
app.get("/profile", (req, res) => {
  if (!req.cookies) {
    res.status(400).json("error");
  }
  if (req.cookies === "") {
    res.status(400).json("error");
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, (err, info) => {
    if (err) {
      res.status(400).json("error");
    }
    res.json(info);
  });
});

//logout
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("logged Out");
});

//create posts
app.post("/post", uploadMiddleware.single("photo"), async (req, res) => {
  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secret, async (err, info) => {
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      console.log(path);
      const newPath = `uploads\\${Date.now()}-${originalname}`;
      fs.renameSync(path, newPath);
      if (title && summary && content) {
        const postDoc = await postModel.create({
          title,
          summary,
          content,
          cover: newPath,
          author: info.username,
        });
        res.json(postDoc);
      }
    } else if (title && summary && content) {
      const postDoc = await postModel.create({
        title,
        summary,
        content,
        cover: "uploads\\default.png",
        author: info.username,
      });
      res.json(postDoc);
    } else {
      res.status(400).json("Error");
    }
  });
});

//displaying posts
app.get("/post", async (req, res) => {
  const resp = await postModel.find();
  res.json(resp);
});

//displaying content
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await postModel.findById(id);
    res.json(postDoc);
  } catch (error) {}
});

app.get("/undefined", (req, res) => {
  res.send("ok");
});

app.listen(4000, console.log("listening on port 4000"));
