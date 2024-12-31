# Server

Este projeto está sendo desenvolvido em Node.js utilizando Fastify.

## Como rodar o projeto

Acesse a pasta do projeto:

```bash
cd web
```

Rodar o comando `npm install` para instalar o pacote as dependências:

```bash
npm install
```

Após instalar as dependências, você deve criar um arquivo `.env` dentro da pasta `server/` usando como base o arquivo `.env.example` e preencher as variáveis de ambiente.

Após configurar o arquivo `.env`, você pode rodar o projeto com o comando:

```bash
npm run dev
```

Você deve ver a mensagem `HTTP server running successfully!` no terminal e o servidor estará rodando em `http://localhost:PORT`, onde `PORT` é a porta configurada no arquivo `.env`.

Para configurar o banco de dados, você deve garantir que o Docker esteja instalado e configurado em sua máquina. Você pode acessar a documentação oficial do Docker [aqui](https://docs.docker.com/get-docker/).

Após instalar o Docker, você pode rodar o comando:

```bash
docker compose up -d
```

Este comando irá subir um container com o banco de dados PostgreSQL.

> **Nota**: Você pode rodar o comando `docker ps` para verificar se o container está rodando.

Após configurar o banco de dados, você pode rodar o comando:

```bash
npx prisma migrate dev
```

Este comando irá criar as tabelas no banco de dados.

> **Nota**: Você pode rodar o comando `npx prisma studio` para visualizar o banco de dados.
