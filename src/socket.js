export default (io) => {
  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      socket.leave("users");
    });

    socket.on("login", (username) => {
      socket.join("users");
      socket
        .to("users")
        .timeout(5000)
        .emit("shareData", username, (err, response) => {
          console.log("response", response);
          io.to(socket.id).emit("usersUpdate", response);
        });
    });
  });
};
