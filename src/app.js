import express, { Router } from "express";
import cors from "cors";
import router from "./routers/index.router.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
