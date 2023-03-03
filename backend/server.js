const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();
// const port = 5000;

const httpServer = createServer(app);
global.io = new Server(httpServer);

// untuk mengenali data json
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// connect BE FE
io.on("connection", (socket) => {
  // socket.on("admin connected with server", (adminName) => {
  //   admins.push({ id: socket.id, admin: adminName });
  //   console.log(admins);
  // });
  socket.on("client sends message", (msg) => {
    // console.log(msg);
    socket.broadcast.emit("server sends message from client to admin", {
      message: msg,
    });
    // if (admins.length === 0) {
    //   socket.emit("no admin", "");
    // } else {
    //   socket.broadcast.emit("server sends message from client to admin", {
    //     message: msg,
    //   });
    // }
  });

  socket.on("admin sends message", ({ message }) => {
    socket.broadcast.emit("server sends message from admin to client", message);
  });

  // socket.on("disconnect", (reason) => {
  //   // admin disconnected
  //   const removeIndex = admins.findIndex((item) => item.id === socket.id);
  //   if (removeIndex !== -1) {
  //     admins.splice(removeIndex, 1);
  //   }
  // });
});

const apiRoutes = require("./routes/apiRoutes");

app.get("/", async (req, res, next) => {
  res.json({ message: "API running..." });
});

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
