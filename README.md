# repo-radar

[![CI](https://github.com/albertm360/repo-radar/actions/workflows/ci.yml/badge.svg)](https://github.com/albertm360/repo-radar/actions/workflows/ci.yml)

Track the GitHub repositories you care about, with tags, notes and stats.

> **Status: early development.** A learning project, built test-first in plain Node.js (ES modules). So far: project tooling and owner/name reference parsing; tracking, tags and stats come next.

## Planned features

- Track repositories by `owner/name`, with tags and a personal note
- Filter, group and rank them, with simple stats (language, tag, activity)
- Later: an HTTP API, Postgres, a GitHub client with rate-limit handling, authentication, and Docker

## Requirements

- Node.js 24 (`.nvmrc` pins it; run `nvm use`)
- npm 11 (bundled with Node 24)

## Getting started

```bash
git clone https://github.com/albertm360/repo-radar.git
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

Workflow:

- `main` is protected: changes go through a pull request and are squash-merged
- Commit messages and PR titles follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`)
- Run `npm run check` before pushing
- CI runs the same `npm run check` on every pull request and on pushes to `main`, and Dependabot keeps the pinned GitHub Actions up to date

## Project layout

- `src/` application code
- `test/` tests
- `fixtures/` captured API responses used by tests
- `.github/` CI workflow and Dependabot configuration

## License

[MIT](LICENSE)
