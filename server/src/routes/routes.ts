import { FastifyInstance } from "fastify";

export const routes = (server: FastifyInstance) => {
  server.get("/", async (request, reply) => {
    return { message: "Hello, Fastify with TypeScript!" };
  });
};