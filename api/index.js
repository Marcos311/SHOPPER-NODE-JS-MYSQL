import express from "express";
import userRoutes from "./routes/products.js";
import userRoutesPack from "./routes/packs.js";
import cors from "cors";

const app = express();
const appPack = express();

app.use(express.json());
app.use(cors());
appPack.use(express.json());
appPack.use(cors());

app.use("/", userRoutes);
appPack.use("/", userRoutesPack);

app.listen(8800);
appPack.listen(8801);