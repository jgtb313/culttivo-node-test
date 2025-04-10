import { Cep } from "../../core/cep";

export type Geocode = Omit<Cep, "cepId" | "favorite">;

export type IGeocode = {
  list: () => Promise<Geocode[]>;
  getGeocode: (geocodeId: string) => Promise<Geocode>;
};
