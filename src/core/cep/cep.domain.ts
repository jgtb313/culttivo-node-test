import { z } from "zod";

export const CepSchema = z.object({
  cepId: z.string(),
  externalId: z.string(),
  zipCode: z.string(),
  street: z.string(),
  complement: z.string(),
  unit: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  stateAbbreviation: z.string(),
  state: z.string(),
  region: z.string(),
  ibgeCode: z.string(),
  giaCode: z.string(),
  areaCode: z.string(),
  siafiCode: z.string(),
  favorite: z.boolean().default(false),
});
export type Cep = z.infer<typeof CepSchema>;
