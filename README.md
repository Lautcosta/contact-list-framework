# Contact List — Test Automation (Playwright)

[![Playwright CI](https://github.com/Lautcosta/contact-list-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Lautcosta/contact-list-framework/actions/workflows/playwright.yml)

Automatización end-to-end sobre la aplicación demo **[Thinking Tester Contact List](https://thinking-tester-contact-list.herokuapp.com/)**, con foco en buenas prácticas de QA: **Page Object Model**, **fixtures**, sesión reutilizable vía **API + `storageState`**, y **CI** en GitHub Actions. Objetivo: suite mantenible, bien estructurada y reproducible en entornos locales y en pipeline.

---

## Stack

| Herramienta | Uso |
|-------------|-----|
| [Playwright](https://playwright.dev/) | E2E, API request context, reportes HTML |
| TypeScript | Tipado y mantenibilidad |
| Node.js | Runtime |
| dotenv | Variables locales (no commitear secretos) |
| GitHub Actions | CI en cada push/PR a `main` |

---

## Qué cubren los tests

| Área | Descripción |
|------|-------------|
| **Auth (UI)** | Login válido e inválido (`tests/auth/login.spec.ts`) — navegador **sin** sesión previa |
| **Contactos** | Alta, edición y baja de contactos (`tests/contacts/`) — contexto **autenticado** con cookie de sesión generada en el setup |

Los datos de contacto usan identificadores únicos (p. ej. email con timestamp) para reducir choques entre corridas.

---

## Decisiones técnicas (resumen)

1. **`global.setup.ts`** — Login por API (`POST /users/login`), guarda `playwright/.auth/storageState.json` para no repetir login por UI en cada test de contactos.
2. **Dos proyectos en Playwright** — `chromium-auth-ui` solo para `login.spec.ts` (sin `storageState`); `chromium-authenticated` para el resto (con `storageState`).
3. **Fixtures** (`fixtures/contactPages.ts`) — Inyección de Page Objects en specs de contactos para menos boilerplate y tests más legibles.
4. **CI** — Mismas variables que en local, inyectadas con [GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) (ver más abajo).

---

## Requisitos

- Node.js **LTS** (recomendado)
- Cuenta de usuario en la app demo (para `USER_EMAIL` / `USER_PASSWORD`)

---

## Instalación

```bash
git clone https://github.com/Lautcosta/contact-list-framework.git
cd contact-list-framework
npm ci
npx playwright install
```

Copiá las variables de entorno (no subas `.env` al repo):

```bash
copy .env.example .env   # Windows
# cp .env.example .env   # macOS / Linux
```

Editá `.env` con tu `BASE_URL`, email y contraseña reales (ver `.env.example`).

---

## Ejecutar tests

**Toda la suite** (ambos proyectos):

```bash
npx playwright test
```

**Solo login por UI** (sin sesión guardada):

```bash
npx playwright test --project=chromium-auth-ui
```

**Solo tests que usan sesión autenticada** (contactos, etc.):

```bash
npx playwright test --project=chromium-authenticated
```

**Un archivo concreto:**

```bash
npx playwright test tests/contacts/addContact.spec.ts --project=chromium-authenticated
```

**Listar tests sin ejecutarlos:**

```bash
npx playwright test --list
```

**Reporte HTML** (después de una corrida):

```bash
npx playwright show-report
```

---

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `BASE_URL` | Origen de la app (ej. `https://thinking-tester-contact-list.herokuapp.com`) |
| `USER_EMAIL` | Usuario para login (API en setup y/o UI en tests de auth) |
| `USER_PASSWORD` | Contraseña |

El archivo `playwright/.auth/storageState.json` se genera en local al correr tests y está **ignorado por git** (no subir sesiones).

---

## CI / GitHub Actions

El workflow [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) ejecuta `npm ci`, instala browsers y corre `npx playwright test`.

En el repositorio de GitHub, configurá estos **repository secrets** (Settings → Secrets and variables → Actions):

- `BASE_URL`
- `USER_EMAIL`
- `USER_PASSWORD`

Los nombres deben coincidir exactamente con los del workflow.

Tras cada corrida exitosa podés descargar el artifact **`playwright-report`** desde la pestaña **Actions** → run → **Artifacts**.

---

## Estructura del repo

```
├── .github/workflows/   # CI
├── data/                # Datos de prueba (ej. contacto con email único)
├── fixtures/            # test extendido + Page Objects inyectados
├── pages/               # Page Object Model
├── tests/
│   ├── auth/            # Login UI
│   └── contacts/        # CRUD contactos (sesión autenticada)
├── global.setup.ts      # Login API + storageState
├── playwright.config.ts
└── .env.example
```

---

## Licencia

Uso educativo y de referencia técnica. La aplicación bajo prueba pertenece a su autora (demo pública).
