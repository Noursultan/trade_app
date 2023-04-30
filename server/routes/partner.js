import express from "express";
import PARTNERS from "../models/PARTNERS.js";

const router = express.Router();

router.get("/partners", async (req, res) => {
  try {
    const partners = await PARTNERS.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
