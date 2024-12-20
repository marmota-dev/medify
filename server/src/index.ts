import fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config()
const app = fastify();

const port: any = process.env.PORT || 8080;

app.get('/', () => {
    return 'Hello World!'
});

app.listen({port}).then(() => console.log('HTTP server running successfully!')).catch(e => console.error(e));