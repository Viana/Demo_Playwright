# Demo_Playwright

Projeto de automação de testes end-to-end utilizando **Playwright** e **TypeScript**, aplicado sobre o sistema bancário de demonstração [ParaBank](https://parabank.parasoft.com/).

---

## 🛠️ Tecnologias

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Git](https://git-scm.com/)

---

## 📁 Estrutura do Projeto

```
tests/
├── e2e/
│   └── register.spec.ts        # Testes end-to-end de registro de usuário
└── support/
    ├── actions/
    │   └── Register.ts         # Ações relacionadas ao fluxo de registro
    ├── components/
    │   └── Elements.ts         # Componentes reutilizáveis (inputs, botões, spans)
    └── fixtures/
        └── users.json          # Massa de dados para os testes
```

---

## ✅ Casos de Teste

| Teste | Descrição |
|---|---|
| `deve registrar usuário com sucesso` | Valida o fluxo completo de registro |
| `deve validar usuário já cadastrado` | Valida mensagem de erro para usuário duplicado |
| `deve validar os campos obrigatórios` | Valida mensagens de erro para todos os campos vazios |
| `deve validar o campo obrigatório: {campo}` | Valida mensagem de erro individualmente por campo |
| `deve validar campo passwords tem o mesmo valor` | Valida que as senhas devem ser iguais |

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/)

---

## 🚀 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/Demo_Playwright.git

# Acesse a pasta do projeto
cd Demo_Playwright

# Instale as dependências
npm install

# Instale os browsers do Playwright
npx playwright install
```

---

## ▶️ Como Executar os Testes

```bash
# Executar todos os testes
npx playwright test

# Executar um arquivo específico
npx playwright test tests/e2e/register.spec.ts

# Executar com interface gráfica (UI Mode)
npx playwright test --ui

# Executar em modo debug
npx playwright test --debug

# Gerar relatório após execução
npx playwright show-report
```

---

## 🔁 CI/CD com GitHub Actions

O projeto possui integração contínua configurada via **GitHub Actions**. Os testes são executados automaticamente a cada `push` ou `pull request` na branch `main`.

O workflow está localizado em:

```
.github/
└── workflows/
    └── playwright.yml
```

Exemplo de configuração:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## 📊 Relatório de Testes

Após a execução, o Playwright gera um relatório HTML automaticamente:

```bash
npx playwright show-report
```

---

## 📄 Licença

Este projeto está sob a licença MIT.
