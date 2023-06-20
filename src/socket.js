export default (io) => {
  io.on("connection", (socket) => {
    console.log(`socket ${socket.id} connected`);
    socket.on("login", (username) => {
      console.log(`user ${username} connected`);
    });
  });
};
