<h1 align="center">
	<img src="https://i0.wp.com/watch-store.co.uk/wp-content/uploads/2021/03/cropped-1100x360-1.png?fit=1100%2C359&ssl=1"  alt="Logo"  width="500"><br><br>
    e-Commerce Watch Store
</h1><br>

<div align="center">

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D) ![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
</div>

Este repositório é um projeto do módulo 2 do curso ["Aprenda a testar aplicações JavaScript"](https://javascript.tv.br/) do Vedovelli.

Neste módulo usamos o framework [Vue](https://vuejs.org/) com o [Nuxt](https://nuxtjs.org/pt/) para criar o frontend da loja de relógios.

Para os testes unitários usamos o [Jest](https://jestjs.io/pt-BR/), e para os testes e2e(end-to-end) usamos o [Cypress](https://www.cypress.io/).

Para não depender de um backend, usamos o [Mirage.js](https://miragejs.com/) para mockar automaticamente todos os produtos, e assim facilitar o aprendizado e a escrita dos testes.

---
# Table of contents

- [Node Version Manager](#node-version-manager)
- [Yarn](#yarn)
- [Editor Config](#editor-config)
- [Prettier](#prettier)
- [ESLint](#eslint)
- [Tailwind CSS](#tailwind-css)
- [Vue](#vue)
- [Nuxt](#nuxt)
  
  - [create nuxt-app](#create-nuxt-app)
  - [Estrutura de pastas](#estrutura-de-pastas)
- [MirageJS](#mirage-js)
- [Jest](#jest)
- [Cypress](#cypress)

---

## Node Version Manager

Devido haver várias versões de Node, é aconselhável que o desenvolvedor já tenha instalado em sua máquina o [Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating). O projeto roda na versão v18.6.0, e se você tem o NVM instalado, use os comandos abaixo estando no diretório raiz do projeto:

```bash
# instala a versão específica do projeto
nvm install 18.6.0 

# altera a versão para 18.6.0
nvm use 
```
[Voltar para o topo](#table-of-contents)
## Yarn

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## Editor Config

Lorem Ipsum...
[Voltar para o topo](#table-of-contents)
## Prettier

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## ESLint

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## Tailwind CSS

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## Vue

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## Nuxt

O Nuxt é um framework desenvolvido em cima do Vue e bastante usado pela comunidade. Permite ter um projeto pré-configurado, e a possibilidade de adicionar plugins via gerenciamento de pacotes como `npm` ou `yarn`.

Para criar uma apliação Nuxt é possível usar a ferramenta que a própria equipe disponibiliza, que já vai sugerrir uma estrutura de pastas com todos os arquivos de configuração.

### create nuxt-app

```bash
yarn create nuxt-app nome-do-projeto
```
Após esse comando a ferramenta perguntará algumas coisas como:

- Project name: *caso queira que seja diferente do nome da pasta criada*
- Programming language: `JavaScript` *ou* `TypeScript`
- Package manager: `yarn` *ou* `npm`
- UI framework: *para esse projeto escolhemos* `Tailwind CSS`
- Nuxt.js modules: *pode escolher mais de uma usando a barra de espaço*.
*Nesta opção escolhemos* `axios` *e* `PWA`
- Linting tools: *ferramentas de qualidade de código*
*Escolhemos* `ESLint`, `Prettier` *e* `Lint staged files`
- Testing framework: `Jest`
- Rendering mode: *Aqui temos a opção de escolher* `Universal` *ou* `Single Page App`

  - `Universal (SSR / SSG)` -> Inclui a opção de primeiro renderizar tudo no servidor e depois devolver o HTML único já com conteúdo. No browser o javascript transforma numa Single Page Application. Temos duas vantagens nisso, performance e projeto pronto para SEO (Search Engine Optimization).

- Deployment target: `server` ou `static`. Escolhemos `server.`
- Development tools: `none`
- Version control system: `Git`

### Estrutura de pastas

## Mirage JS

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## Jest

Lorem ipsum...
[Voltar para o topo](#table-of-contents)
## Cypress

Lorem ipsum...
[Voltar para o topo](#table-of-contents)

<details>
  <summary>Teste
  </summary>
</details>
