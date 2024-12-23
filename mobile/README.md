# Mobile

Este projeto está sendo desenvolvido em React Native utilizando Expo.

## Como rodar o projeto

Acesse a pasta do projeto:

```bash
cd mobile
```

rodar o comando `npm install` para instalar o pacote as dependências:

```bash
npm install
```

Após instalar as dependências, você pode rodar o projeto com o comando:

```bash
npx expo start
```

você pode visualizar o projeto em um **emulador**, **navegador** ou no seu **dispositivo móvel com o aplicativo Expo Go**.

**Navegador:**

Para rodar o projeto no navegador, primeiro você deve pressionar `w` no terminal para abrir o projeto no navegador.

**Dispositivo Móvel:**

Para rodar o projeto no seu dispositivo móvel, você precisa instalar o aplicativo Expo Go:

- [Expo Go para Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo Go para iOS](https://apps.apple.com/br/app/expo-go/id982107779)

Após instalar o aplicativo, você pode escanear o QR Code gerado no terminal (após rodar o comando `npx expo start`) para visualizar o projeto no seu dispositivo.

> **Nota 1**: O dispositivo móvel deve estar conectado à mesma rede Wi-Fi que o computador.

> **Nota 2**: Se a conexão não funcionar, você pode tentar adicionar a flag `--tunnel` ao rodar o projeto, da seguinte forma: `npx expo start --tunnel`.

**Emulador:**

Para rodar o projeto em um emulador, você precisa ter o emulador configurado na sua máquina. Você pode seguir as instruções da documentação do Expo para configurar o emulador:

- Para Android: [Configurando o Emulador Android](https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=simulated)

- Para iOS: [Configurando o Emulador iOS](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=expo-go)

## Navegação

### Estrutura de Navegação - Pasta Screens

A estrutura é inspirada no Expo Router. Cada pasta representa uma stack de navegação do [React Navigation](https://reactnavigation.org/docs/getting-started), e as subpastas indicam que a stack está dentro de outra.

#### Estrutura de Pastas

- **screens**: Stack raiz.
  - **_layout-root.tsx**: Configuração da stack raiz.
  - **tabs**: Stack interna (ex: navegação por abas).
    - **_layout-tabs.tsx**: Configuração da stack de tabs.
    - **Home.tsx**: Tela da primeira aba.
    - **Profile.tsx**: Tela da segunda aba.

Cada stack deve ter um arquivo `_layout-xxx.tsx` para configurar a navegação.
