import express from "express";
import { getPacks, addPack, updatePack, deletePack } from "../controllers/pack.js";

const router = express.Router();

router.get("/", getPacks);

router.post("/", addPack);

router.put("/:id", updatePack);

router.delete("/:id", deletePack);

export default router; 