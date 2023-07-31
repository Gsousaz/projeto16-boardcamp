import joi from "joi";

export const clientesSchema = joi.object({
  cpf: joi.number().trim().required().length(11),
  phone: joi.string().trim().min(10).max(11).required(),
  name: joi.string().required(),
  birthday: joi.date().iso().required()
});
