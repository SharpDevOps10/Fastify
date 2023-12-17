import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';
import { productResponseSchema } from './product.schema';

const tagCore = {
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  brand: z.string(),
  category: z.string(),
  isGlutenFree: z.boolean().default(true),
  isDiabetic: z.boolean().default(false),
};

export const createTagSchema = z.object({
  ...tagCore,
});

export const createTagResponseSchema = z.object({
  id: z.number(),
  ...tagCore,
  products: z.array(productResponseSchema),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;

export const { schemas: tagSchemas, $ref } = buildJsonSchemas({
  createTagSchema,
  createTagResponseSchema,
});