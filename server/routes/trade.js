import express from "express";
import TRADE from "../models/TRADE.js";

const router = express.Router();

router.get("/tradeValues", async (req, res) => {
  try {
    const tradeValues = await TRADE.find();
    res.status(200).json(tradeValues);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
