# clone-tabnews

Curso do Filipe Deschamps

## Requisitos

- Node.js na versão LTS Hydrogen
- Next.js
- React

## Instalação

1. Instale a versão correta do Node.js:

   ```sh
   nvm install lts/hydrogen
   nvm use lts/hydrogen
   ```

2. Defina a versão LTS Hydrogen como padrão:

   ```sh
   nvm alias default lts/hydrogen
   ```

3. Instale as dependências do projeto:
   ```sh
   npm install
   ```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

```sh
npm run dev
```

<!--
Versão do node:
nvm install lts/hydrogen
nvm install

Versão do node default:
nvm alias default lts/hydrogen
-->

Rodando o docker compose:

```sh
docker compose -f infra/compose.yaml up -d
```

Rodando um teste em específico:

```sh
npm run test:watch -- migration.post
```
