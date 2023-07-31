import { Router } from "express";
import {
  deletarAluguel,
  inserirAluguel,
  listarAlugueis,
} from "../controllers/alugueis.controller.js";

const alugueisRouter = Router();

alugueisRouter.post("/rentals", inserirAluguel);
alugueisRouter.get("/rentals", listarAlugueis);
alugueisRouter.delete("/rentals/:id", deletarAluguel);

export default alugueisRouter;
