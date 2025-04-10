import { CepJsonInMemoryRepository } from "./adapters/json-in-memory";
import { ViaCepAdapter } from "./adapters/via-cep";
import { CepService } from "./core/cep";

export const Dependencies = {
  CepService: CepService({
    GeocodeService: ViaCepAdapter(),
    CepRepository: CepJsonInMemoryRepository(),
  }),
};
