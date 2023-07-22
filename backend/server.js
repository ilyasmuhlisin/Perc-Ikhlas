require("dotenv").config();
// import path from "path";
// nodejs security
var helmet = require("helmet");
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const app = express();
// const __dirname = path.resolve();
// const port = 5000;

app.use(helmet());

// app.use(cors({
//   origin:["https://deploy-mern-1whq-vercel.app"],
//   methods:["POST","GET"],
//   credentials: true
// }))

const httpServer = createServer(app);
global.io = new Server(httpServer);

// untuk mengenali data json
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

// cyclic
// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/build/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });

const admins = [];
let activeChats = [];
function get_random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// connect BE FE
io.on("connection", (socket) => {
  socket.on("admin connected with server", (adminName) => {
    admins.push({ id: socket.id, admin: adminName });
    // console.log(admins);
  });
  socket.on("client sends message", (msg) => {
    // console.log(msg);
    // socket.broadcast.emit("server sends message from client to admin", {
    //   message: msg,
    // });
    if (admins.length === 0) {
      socket.emit("no admin", "");
    } else {
      // one to one
      let client = activeChats.find((client) => client.clientId === socket.id);
      let targetAdminId;
      if (client) {
        targetAdminId = client.adminId;
      } else {
        let admin = get_random(admins);
        activeChats.push({ clientId: socket.id, adminId: admin.id });
        targetAdminId = admin.id;
      }
      socket.broadcast
        .to(targetAdminId)
        .emit("server sends message from client to admin", {
          user: socket.id,
          message: msg,
        });
    }
  });

  // socket.on("admin sends message", ({ message }) => {
  //   socket.broadcast.emit("server sends message from admin to client", message);
  // });
  socket.on("admin sends message", ({ user, message }) => {
    socket.broadcast
      .to(user)
      .emit("server sends message from admin to client", message);
  });

  socket.on("admin closes chat", (socketId) => {
    socket.broadcast.to(socketId).emit("admin closed chat", "");
    let c = io.sockets.sockets.get(socketId);
    c.disconnect(); // reason:  server namespace disconnect
  });

  socket.on("disconnect", (reason) => {
    socket.on("disconnect", (reason) => {
      // admin disconnected
      const removeIndex = admins.findIndex((item) => item.id === socket.id);
      if (removeIndex !== -1) {
        admins.splice(removeIndex, 1);
      }
      activeChats = activeChats.filter((item) => item.adminId !== socket.id);

      // client disconnected
      const removeIndexClient = activeChats.findIndex(
        (item) => item.clientId === socket.id
      );
      if (removeIndexClient !== -1) {
        activeChats.splice(removeIndexClient, 1);
      }
      socket.broadcast.emit("disconnected", {
        reason: reason,
        socketId: socket.id,
      });
    });
  });
});

const apiRoutes = require("./routes/apiRoutes");

// app.get("/", async (req, res, next) => {
//   res.json({ message: "API running..." });
// });

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API running..." });
  });
}

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
