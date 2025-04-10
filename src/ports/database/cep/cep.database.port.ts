import { Cep } from "../../../core/cep";

export type ICepRepository = {
  findAll: (input: Partial<Cep>) => Promise<Cep[]>;
  findById: (cepId: string) => Promise<Cep>;
  findByZode: (input: Pick<Partial<Cep>, "zipCode">) => Promise<Cep | null>;
  create: (input: Omit<Cep, "cepId">) => Promise<Cep>;
  updateById: (cepId: string, input: Partial<Cep>) => Promise<Cep>;
  deleteById: (cepId: string) => Promise<void>;
};
