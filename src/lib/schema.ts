import {z} from "zod";

export const ProductSchema=z.object({
    name:z.string().trim().nonempty({
      message:"Name is required"
    }),
    description:z.string().trim().nonempty({
      message:"Description is required"
    }),
    price: z.number().min(0, {
        message: "Price must be a valid number and greater than or equal to 0"
      }).refine(value => !Number.isNaN(value), {
        message: "Price must be a valid number"
      }),
  
  })
