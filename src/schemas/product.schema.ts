import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const productInput = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});

export const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const updateProductSchema = z.object({
  title: z.string().optional(),
  price: z.number().optional(),
  content: z.string().optional(),
});

const productsResponseSchema = z.array(productResponseSchema);

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
});