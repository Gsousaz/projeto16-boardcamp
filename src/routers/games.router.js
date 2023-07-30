import { Router } from "express";
import { inserirJogo, listarJogos } from "../controllers/jogos.controller.js";

const gamesRouter = Router();

gamesRouter.get("/games", listarJogos);
gamesRouter.post("/games", inserirJogo);

export default gamesRouter;
