# Avaliação Playwright E2E
Automação de testes end-to-end com Playwright e ZeroStep AI, desenvolvida como parte de uma avaliação da matéria de Automação de Testes do curso de Engenharia de Software da UniSatc.

## Como executar o projeto

Para executar este projeto, siga os passos abaixo:

1. Instale o [Node JS](https://nodejs.org/) (versão >= 20.x)
2. Execute `npm i --save-dev` para instalar todas as dependências do projeto
3. Execute `npx playwright install` para instalar os navegadores usados pelo Playwright
4. Execute `npm run ci` para rodar toda a suíte de testes
5. Execute `npm run scenario` para rodar os testes feitos para a avaliação
6. Execute `npm run show-report` para visualizar os relatórios

Todos os artefatos de execução podem ser encontrados em `./artifacts`. Se quiser removê-los, execute `npm run clean`.

## ZeroStep AI

Para utilizar IA nos testes Playwright com ZeroStep, é necessário criar um arquivo `zerostep.config.json` na raiz do seu projeto e adicionar seu token do ZeroStep, que deve se parecer com isso:

```
{"TOKEN": "0step:00000000-0000-0000-0000-000000000000"}
```

## Cenários de teste

O site escolhido para ser testado na avaliação de testes E2E pode ser acessado pelo link: https://the-internet.herokuapp.com/. Os cenários testados foram:

* Login com sucesso
* Login com sucesso (utilizando IA)
* Login com falha
* Login com falha (utilizando IA)
* Auth com sucesso
* Auth sem credenciais
* Auth com credenciais erradas
* Input
* Key presses
* Download
