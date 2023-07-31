import { Router } from "express";
import gamesRouter from "./games.router.js";
import clientesRouter from "./clientes.router.js";

const router = Router();

router.use(gamesRouter);
router.use(clientesRouter);

export default router;
