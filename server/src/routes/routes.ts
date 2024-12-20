import { FastifyInstance } from "fastify";

export const routes = (server: FastifyInstance) => {
  server.get("/", async (request, reply) => {
    return { message: "Hello World!" };
  });

  server.post('/pharmacy/add', async (request, reply) => {
    reply.status(201).send({ message: 'Pharmacy added successfully'});
  });

  server.delete('/pharmacy/delete', async (request, reply) => {
    reply.status(200).send({ message: 'Pharmacy deleted successfully!' })
  });
};