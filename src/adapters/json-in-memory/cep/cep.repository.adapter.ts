import { v4 as uuidv4 } from "uuid";
import { isUndefined } from "lodash";

import { Cep, CepSchema } from "../../../core/cep";
import { ICepRepository } from "../../../ports/database/cep/cep.database.port";

let CEPS: Cep[] = [];

export const CepJsonInMemoryRepository = (): ICepRepository => ({
  async findAll({ favorite }) {
    const data = CEPS.filter((cep) => {
      if (!isUndefined(favorite)) {
        return cep.favorite === favorite;
      }

      return cep;
    });

    return data.map((cep) => CepSchema.parse(cep));
  },

  async findById(cepId) {
    const cep = CEPS.find((cep) => cep.cepId === cepId);

    if (!cep) {
      throw new Error(`Cep ${cepId} not found`);
    }

    return CepSchema.parse(cep);
  },

  async findByZode({ zipCode }) {
    const cep = CEPS.find((cep) => {
      return zipCode ? cep.zipCode === zipCode : cep;
    });

    if (!cep) {
      return null;
    }

    return CepSchema.parse(cep);
  },

  async create(input) {
    const cep = {
      ...input,
      cepId: uuidv4(),
    };

    CEPS = [...CEPS, cep];

    return CepSchema.parse(cep);
  },

  async updateById(cepId, input) {
    const cep = await this.findById(cepId);

    CEPS = CEPS.map((cepInMemory) =>
      cepInMemory.cepId === cep.cepId
        ? { ...cepInMemory, ...input }
        : cepInMemory
    );

    return this.findById(cepId);
  },

  async deleteById(cepId) {
    const cep = await this.findById(cepId);

    CEPS = CEPS.filter((cepInMemory) => cepInMemory.cepId !== cepId);

    return;
  },
});
