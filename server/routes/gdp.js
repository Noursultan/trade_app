import express from "express";
import GDP from "../models/GDP.js";

const router = express.Router();

router.get("/gdpValues", async (req, res) => {
  try {
    const gdpValues = await GDP.find();
    res.status(200).json(gdpValues);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
