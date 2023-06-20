import express from "express";
import rooms from "../controllers/rooms.js";
import loadUser from "../middleware/loadUser.js";
import requiresAuth from "../middleware/requiresAuth.js";

export default function roomsRouter(io) {
  const router = express.Router();

  router.get("/rooms", loadUser, requiresAuth, async (req, res) => {
    res.render("rooms", { user: res.locals.user });
  });

  router.post("/sendMessage", async (req, res) => {});
  return router;
}
