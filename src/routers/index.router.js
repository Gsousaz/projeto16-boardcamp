import { Router } from "express";
import gamesRouter from "./games.router.js";
import clientesRouter from "./clientes.router.js";
import alugueisRouter from "./alugueis.router.js";

const router = Router();

router.use(gamesRouter);
router.use(clientesRouter);
router.use(alugueisRouter);

export default router;
