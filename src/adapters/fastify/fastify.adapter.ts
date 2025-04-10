import { server } from "./fastify.server";

import { CepHttp } from "../../ports/http/cep/cep.http.port";
import { Dependencies } from "../../dependencies";

export const startServer = async () => {
  const cepHttp = CepHttp(Dependencies);

  server.get("/ceps", async function handler(request, reply) {
    const response = await cepHttp.listCeps.handler(request as any);

    return reply.status(200).send(response);
  });

  server.get("/ceps/:zipCode", async function handler(request, reply) {
    const response = await cepHttp.getCep.handler(request as any);

    return reply.status(200).send(response);
  });

  server.patch("/ceps/:cepId", async function handler(request, reply) {
    const response = await cepHttp.listCeps.handler(request as any);

    return reply.status(200).send(response);
  });

  server.post(
    "/ceps/:zipCode/favorite",
    async function handler(request, reply) {
      const response = await cepHttp.favoriteCep.handler(request as any);

      return reply.status(200).send(response);
    }
  );

  server.post(
    "/ceps/:zipCode/unfavorite",
    async function handler(request, reply) {
      const response = await cepHttp.unfavoriteCep.handler(request as any);

      return reply.status(200).send(response);
    }
  );

  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
  }
};
