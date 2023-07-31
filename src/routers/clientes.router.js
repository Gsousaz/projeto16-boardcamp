import { Router } from "express";
import {
  atualizarCliente,
  buscarClienteId,
  inserirCliente,
  listarClientes,
} from "../controllers/clientes.controller.js";
import { clientesSchema } from "../schemas/clientesSchema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const clientesRouter = Router();

clientesRouter.get("/customers", listarClientes);
clientesRouter.get("/customers/:id", buscarClienteId);
clientesRouter.post("/customers",validateSchema(clientesSchema), inserirCliente);
clientesRouter.put("/customers/:id", validateSchema(clientesSchema), atualizarCliente);

export default clientesRouter;
