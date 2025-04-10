import axios from "axios";

import { IGeocode } from "../../ports/geocode/geocode.port";

const client = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

type ViaCep = {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export const ViaCepAdapter = (): IGeocode => ({
  async list() {
    const { data } = await client.get<ViaCep[]>(
      "RS/Porto%20Alegre/Domingos/json/"
    );

    return data.map((item) => {
      const externalId = item.cep;

      return {
        zipCode: item.cep,
        externalId,
        street: item.logradouro,
        complement: item.complemento,
        unit: item.unidade,
        neighborhood: item.bairro,
        city: item.localidade,
        stateAbbreviation: item.uf,
        state: item.estado,
        region: item.regiao,
        ibgeCode: item.ibge,
        giaCode: item.gia,
        areaCode: item.ddd,
        siafiCode: item.siafi,
      };
    });
  },

  async getGeocode(geocodeId: string) {
    const { data } = await client.get<ViaCep>(`${geocodeId}/json/`);

    const externalId = data.cep;

    return {
      zipCode: data.cep,
      externalId,
      street: data.logradouro,
      complement: data.complemento,
      unit: data.unidade,
      neighborhood: data.bairro,
      city: data.localidade,
      stateAbbreviation: data.uf,
      state: data.estado,
      region: data.regiao,
      ibgeCode: data.ibge,
      giaCode: data.gia,
      areaCode: data.ddd,
      siafiCode: data.siafi,
    };
  },
});
