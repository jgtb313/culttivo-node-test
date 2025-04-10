import { ICepRepository } from "../../ports/database/cep/cep.database.port";
import { IGeocode } from "../../ports/geocode/geocode.port";
import { Cep } from "./cep.domain";

export const CepService = ({
  CepRepository,
  GeocodeService,
}: {
  GeocodeService: IGeocode;
  CepRepository: ICepRepository;
}) => {
  return {
    async listCeps({ favorite }: Pick<Partial<Cep>, "favorite">) {
      const ceps = await CepRepository.findAll({ favorite });
      const geocodes = await GeocodeService.list();

      return [...ceps, ...geocodes].map((geocode) => {
        const cep = ceps.find((cep) => cep.zipCode == geocode.zipCode);

        return {
          ...geocode,
          ...cep,
          favorite: cep?.favorite ?? false,
        };
      });
    },

    async getCep(zipCode: string) {
      const cep = await CepRepository.findByZode({ zipCode });

      if (!cep) {
        return null;
      }

      const geocode = await GeocodeService.getGeocode(cep.zipCode);

      return {
        ...geocode,
        ...cep,
        favorite: cep?.favorite ?? false,
      };
    },

    async createCep({ zipCode, ...input }: Pick<Cep, "zipCode" | "favorite">) {
      const exists = await CepRepository.findByZode({ zipCode });

      if (exists) {
        throw new Error("Cep already exists");
      }

      const geocode = await GeocodeService.getGeocode(zipCode);

      const payload = {
        ...geocode,
        ...input,
      };

      const cep = await CepRepository.create(payload);

      return cep;
    },

    async updateCep(zipCode: string, input: Partial<Cep>) {
      const cep = await CepRepository.findByZode({ zipCode });

      if (!cep) {
        throw new Error(`Cep ${zipCode} not found`);
      }

      return CepRepository.updateById(cep.cepId, input);
    },

    async deleteCep(cepId: string) {
      const cep = await CepRepository.findById(cepId);

      await CepRepository.deleteById(cep.cepId);
    },
  };
};
export type ICepService = ReturnType<typeof CepService>;
