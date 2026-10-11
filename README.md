# repo-radar

Track the GitHub repositories you care about, with tags, notes and stats.

> **Status: early development.** A learning project, built test-first in plain Node.js (ES modules). So far it contains only the project setup and tooling; the core logic comes next.

## Planned features

- Track repositories by `owner/name`, with tags and a personal note
- Filter, group and rank them, with simple stats (language, tag, activity)
- Later: an HTTP API, Postgres, a GitHub client with rate-limit handling, authentication, and Docker

## Requirements

- Node.js 24 (`.nvmrc` pins it; run `nvm use`)
- npm 11 (bundled with Node 24)

## Getting started

```bash
git clone <repo-url>
cd repo-radar
nvm use
npm ci
npm run check
```

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm test`             | Runs the tests (`node --test`)           |
| `npm run lint`         | Lints with ESLint                        |
| `npm run format`       | Formats with Prettier                    |
| `npm run format:check` | Checks formatting without changing files |
| `npm run check`        | Lint, format check and tests             |

## Development

Code is written test-first (red, green, refactor). Real API responses are saved in `fixtures/` so tests run offline and stay deterministic.

## Project layout

- `src/` application code
- `test/` tests
- `fixtures/` captured API responses used by tests

## License

[MIT](LICENSE)
