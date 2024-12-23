# Medify

O **Medify** é um aplicativo que conecta pessoas a farmácias próximas de forma rápida e prática. Nosso objetivo é facilitar a comunicação entre clientes e farmácias, oferecendo um meio eficiente para o contato direto.

**Como funciona:**

- O usuário encontra farmácias próximas à sua localização.
- A partir do aplicativo, o usuário é redirecionado para entrar em contato (para o whatsapp por exemplo) com a farmácia escolhida.
- O processo de compra é finalizado diretamente entre o cliente e a farmácia.

**Nota:** Não realizamos transações ou vendas pelo aplicativo, apenas conectamos as pessoas com as farmácias (até o momento).

**Estrutura do projeto:**

- **Mobile**: Aplicativo desenvolvido em React Native com Expo.
- **Server**: API desenvolvida em Node.js utilizando Fastify para gerenciamento de dados e conexões.

Este monorepo organiza os dois projetos para facilitar o desenvolvimento integrado.

## Como rodar o projeto

Dentro de uma pasta local, clone o repositório:

```bash
git clone https://github.com/marmota-dev/medify.git
```

Acesse a pasta do projeto:

```bash
cd medify
```

rodar o comando `npm install` para instalar o pacote **Husky**:

```bash
npm install
```

Agora, acesse a pasta do projeto que deseja rodar (mobile ou server) e siga as instruções do README.md de cada projeto.
