# Server

Este projeto está sendo desenvolvido em Node.js utilizando Fastify.

## Como rodar o projeto

Acesse a pasta do projeto:

```bash
cd web
```

rodar o comando `npm install` para instalar o pacote as dependências:

```bash
npm install
```

Após instalar as dependências, você deve criar um arquivo `.env` dentro da pasta `server/` usando como base o arquivo `.env.example` e preencher as variáveis de ambiente.

Após configurar o arquivo `.env`, você pode rodar o projeto com o comando:

```bash
npm run dev
```

você deve ver a mensagem `HTTP server running successfully!` no terminal e o servidor estará rodando em `http://localhost:PORT`, onde `PORT` é a porta configurada no arquivo `.env`.
