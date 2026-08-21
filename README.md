# RArdware

Aplicativo mobile de realidade aumentada para ensino interativo de hardware de computadores.

## Pré-requisitos

| Ferramenta     | Versão mínima                  |
| -------------- | ------------------------------ |
| Node.js        | >= 22.11.0                     |
| npm            | >= 10                          |
| OpenJDK        | 17                             |
| Android Studio | Ladybug (2024.2.x) ou superior |
| Android SDK    | API 34 (Android 14)            |

### Variáveis de ambiente obrigatórias

```powershell
# ANDROID_HOME deve apontar para o SDK
$env:ANDROID_HOME = "C:\Users\<seu-usuario>\AppData\Local\Android\Sdk"
```

## Setup

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o Metro bundler
npm start

# 3. Em outro terminal, rodar no Android (emulador ou device)
npm run android
```

## Scripts disponíveis

| Script             | O que faz                               |
| ------------------ | --------------------------------------- |
| `npm start`        | Inicia o Metro bundler                  |
| `npm run android`  | Builda e instala no Android             |
| `npm run lint`     | Verifica erros de lint                  |
| `npm run lint:fix` | Corrige erros de lint automaticamente   |
| `npm run format`   | Formata arquivos em `src/` com Prettier |
| `npm test`         | Roda a suite de testes                  |

## Estrutura do projeto

```
src/
├── screens/     # Telas do app (HomeScreen, ARScreen, etc.)
├── components/  # Componentes reutilizáveis
├── hooks/       # Custom hooks
├── db/          # Banco de dados SQLite + repositórios
├── ar/          # Cena AR (HTML + Babylon.js + AR.js)
├── assets/      # Imagens, modelos 3D, marcadores ArUco
├── store/       # Estado global (Zustand)
├── theme/       # Tokens de design (cores, fontes, espaçamentos)
└── utils/       # Funções utilitárias
```

## Regra importante: aliases de path

Ao adicionar um novo alias, **sempre atualizar os dois arquivos juntos**:

1. `tsconfig.json` → seção `compilerOptions.paths`
2. `babel.config.js` → seção `plugins[module-resolver].alias`

Divergência entre os dois causa erro de bundle em runtime sem erro de compilação TypeScript.

## Stack

- **React Native** 0.87 (Bare)
- **TypeScript** strict
- **AR:** AR.js (ArUco tracking) + Babylon.js em WebView
- **Banco:** SQLite + Drizzle ORM
- **Navegação:** React Navigation v6
- **Estado:** Zustand
