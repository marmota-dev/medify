import fastify from "fastify";
import { env } from "../env";
import { routes } from "../routes/routes";

const app = fastify();

routes(app);

app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server running successfully!');
}).catch(e => {
    console.error(e);
});