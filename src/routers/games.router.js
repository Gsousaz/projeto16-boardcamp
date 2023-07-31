import { Router } from "express";
import { inserirJogo, listarJogos } from "../controllers/jogos.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { jogosSChema } from "../schemas/jogosSchema.js";

const gamesRouter = Router();

gamesRouter.get("/games", listarJogos);
gamesRouter.post("/games", validateSchema(jogosSChema), inserirJogo);

export default gamesRouter;
