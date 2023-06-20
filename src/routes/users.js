import express from "express";
import users from "../controllers/users.js";

export default function usersRouter(io) {
  const router = express.Router();
  // views
  router.get("/register", (req, res) => {
    res.render("register");
  });
  router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
  });

  // endpoints
  router.post("/register", async (req, res) => {
    const user = await users.createUser(req.body.username, req.body.password);
    res.cookie("token", user.token);
    res.redirect("/");
  });
  router.post("/login", async (req, res) => {
    const user = await users.getUserByPassword(
      req.body.username,
      req.body.password
    );
    res.cookie("token", user.token);
    console.log("logged in", user.token);
    res.redirect("/rooms");
  });

  return router;
}
