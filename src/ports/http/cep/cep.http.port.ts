import { z } from "zod";
import { HttpRequest } from "../http.support";
import { Cep, CepSchema, ICepService } from "../../../core/cep";

const ListCepsQuerySchema = CepSchema.pick({
  favorite: true,
});
type ListCepsQuery = z.infer<typeof ListCepsQuerySchema>;

const GetCepParamsSchema = CepSchema.pick({
  zipCode: true,
});
type GetCepParams = z.infer<typeof GetCepParamsSchema>;

const FavoriteCepParamsSchema = CepSchema.pick({
  zipCode: true,
});
type FavoriteCepParams = z.infer<typeof FavoriteCepParamsSchema>;

const UnfavoriteCepParamsSchema = CepSchema.pick({
  zipCode: true,
});
type UnfavoriteCepParams = z.infer<typeof UnfavoriteCepParamsSchema>;

export const CepHttp = ({ CepService }: { CepService: ICepService }) => ({
  listCeps: {
    querySchema: ListCepsQuerySchema,
    handler: ({ query }: HttpRequest<ListCepsQuery, {}, {}>) => {
      return CepService.listCeps(query);
    },
  },

  getCep: {
    paramsSchema: GetCepParamsSchema,
    handler: ({ params }: HttpRequest<{}, GetCepParams, {}>) => {
      return CepService.getCep(params.zipCode);
    },
  },

  updateCep: {
    paramsSchema: GetCepParamsSchema,
    handler: ({ params }: HttpRequest<{}, GetCepParams, {}>) => {
      return CepService.getCep(params.zipCode);
    },
  },

  favoriteCep: {
    paramsSchema: FavoriteCepParamsSchema,
    handler: ({ params }: HttpRequest<{}, FavoriteCepParams, {}>) => {
      return CepService.createCep({
        zipCode: params.zipCode,
        favorite: true,
      });
    },
  },

  unfavoriteCep: {
    querySchema: ListCepsQuerySchema,
    handler: ({ params }: HttpRequest<{}, UnfavoriteCepParams, {}>) => {
      return CepService.updateCep(params.zipCode, {
        favorite: false,
      });
    },
  },
});
