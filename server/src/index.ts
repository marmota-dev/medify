import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const port: any = process.env.PORT

const app = fastify();

app.get('/', () => {
    return 'Hello World!'
});

app.listen({port}).then(() => console.log('HTTP server running successfully!')).catch(e => console.error(e));