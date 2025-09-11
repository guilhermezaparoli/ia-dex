declare module "fastify-multipart" {
  import { FastifyPluginCallback } from "fastify";

  const fastifyMultipart: FastifyPluginCallback<{}>;

  export default fastifyMultipart;
}