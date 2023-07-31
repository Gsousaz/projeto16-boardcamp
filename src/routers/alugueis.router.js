import { Router } from "express";
import { deletarAluguel, inserirAluguel } from "../controllers/alugueis.controller.js";

const alugueisRouter = Router();

alugueisRouter.post("/rentals", inserirAluguel);
alugueisRouter.delete("/rentals/:id", deletarAluguel)

export default alugueisRouter;
