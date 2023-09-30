import * as Joi from "joi"

export const createTodoSchema = Joi.object({
    name: Joi.string().required().min(10),
    visi: Joi.string().required().min(10),
    image: Joi.string().required()
})

export default interface ITodos {
    name: string,
    visi: string,
    image: string,
}