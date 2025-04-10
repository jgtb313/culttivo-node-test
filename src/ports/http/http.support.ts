export type HttpRequest<Q = {}, P = {}, B = {}> = {
  query: Q;
  params: P;
  body: B;
};
