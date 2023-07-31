import joi from "joi";

export const clientesSchema = joi.object({
  cpf: joi.string().trim().length(11).pattern(/^\d+$/).required(),
  phone: joi
    .string()
    .trim()
    .pattern(/^\d{10,11}$/)
    .required(),

  name: joi.string().required(),
  birthday: joi.date().iso().required(),
});
