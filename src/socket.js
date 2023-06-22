export default (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      socket.leave("lobby");
    });

    socket.on("login", (user) => {
      socket.join("lobby");
      socket
        .to("lobby")
        .emit("shareDataLogin", { socket: socket.id, user: user });
    });
    socket.on("loginResponse", (data) => {
      io.to(data.socket).emit("receiveLoginResponse", data.data);
    });
    socket.on("messageSent", (data) => {
      io.to(data.room).emit("newMessage", data);
    });
  });
};
