import { Router } from "express";
import {
  deletarAluguel,
  finalizarAluguel,
  inserirAluguel,
  listarAlugueis,
} from "../controllers/alugueis.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { alugueisSchema } from "../schemas/alugueisSchema.js";

const alugueisRouter = Router();

alugueisRouter.post("/rentals",validateSchema(alugueisSchema), inserirAluguel);
alugueisRouter.get("/rentals", listarAlugueis);
alugueisRouter.delete("/rentals/:id", deletarAluguel);
alugueisRouter.post("/rentals/:id/return", finalizarAluguel);

export default alugueisRouter;
