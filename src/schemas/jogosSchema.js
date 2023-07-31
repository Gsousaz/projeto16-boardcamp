import joi from "joi";

export const jogosSChema = joi.object({
  name: joi.string().required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().positive().required(),
  pricePerDay: joi.number().positive().required(),
});
