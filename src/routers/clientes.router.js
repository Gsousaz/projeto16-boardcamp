import { Router } from "express";
import {
  atualizarCliente,
  buscarClienteId,
  inserirCliente,
  listarClientes,
} from "../controllers/clientes.controller.js";

const clientesRouter = Router();

clientesRouter.get("/customers", listarClientes);
clientesRouter.get("/customers/:id", buscarClienteId);
clientesRouter.post("/customers", inserirCliente);
clientesRouter.put("/customers/:id", atualizarCliente);

export default clientesRouter;
