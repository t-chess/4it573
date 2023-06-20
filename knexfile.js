export default {
  client: "mysql",
  connection: {
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "rooms",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "",
  },
};
