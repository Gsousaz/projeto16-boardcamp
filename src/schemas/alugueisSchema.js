import joi from "joi";

export const alugueisSchema = joi.object({
  daysRented: joi.number().required().positive(),
  customerId: joi.number().required().positive(),
  gameId: joi.number().required()
});
