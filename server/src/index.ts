import fastify from 'fastify';
import dotenv from 'dotenv';
import { routes } from './routes/routes';

dotenv.config();

const port: any = process.env.PORT;

const app = fastify();

routes(app);

app.listen({port}).then(() => console.log('HTTP server running successfully!')).catch(e => {
    console.error(e);
    process.exit(1);
});