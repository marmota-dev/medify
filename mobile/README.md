# Mobile

Este projeto será desenvolvido em React Native utilizando Expo. 

Por enquanto, esta pasta está reservada para o projeto futuro.

---

## Instruções 

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
