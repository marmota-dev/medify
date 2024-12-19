import fastify from 'fastify';

const app = fastify();

const port = 3333;

app.get('/', () => {
    return 'Hello World!'
});

app.listen({port}).then(() => console.log('HTTP server running successfully!')).catch(e => console.error(e));