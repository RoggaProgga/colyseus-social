import express from "express";

import { facebookAuth, getOnlineFriends, logout } from "../src";
import User from "../src/models/User";

const route = express.Router();

route.get("/facebook", async (req, res) => {
    const { accessToken } = req.params;
    const user = await facebookAuth(accessToken);
    res.json(user);
});

route.get("/friends", async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId });
    res.json(await getOnlineFriends(user));
});

route.get("/logout", async (req, res) => {
    await logout(req.params.userId);
    res.json({ success: true });
});

export default route;