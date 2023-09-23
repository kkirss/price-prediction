# Price Prediction

Toy app to predict prices of Bitcoin.

https://kkirss.github.io/price-prediction/

## Technology

* [TypeScript](https://www.typescriptlang.org/) _(language)_
* [pnpm](https://pnpm.io/) _(package manager)_
* [Turbopack](https://turbo.build/pack) _(monorepo build system)_
* [Vite](https://vitejs.dev/) _(build tool)_
* [StandardJS](https://standardjs.com/) _(linter)_

### Frontend

* [SolidJS](https://www.solidjs.com/) _(frontend framework)_

## Development

### Requirements

* [pnpm](https://pnpm.io/installation)

### Setup

```bash
pnpm install
```

### Start Dev Server

```bash
pnpm run dev
```

### Lint

```bash
pnpm run lint
```

Or to automatically fix issues, if possible:
```bash
pnpm run lint:fix
```

### Check Types

```bash
pnpm run check-types
```

### Test

```bash
pnpm run test
```

Or to run tests in watch mode:
```bash
pnpm run test:watch
```

### Preview Production Build Locally

```bash
pnpm run serve
```

## Deploy

### Frontend

To deploy the web frontend to GitHub Pages:
```bash
pnpm run deploy:web
```

### Build

```bash
pnpm run build
```

## Architecture

### Monorepo

This project is a monorepo, to allow for easier development and deployment.

The repo is split into multiple subprojects.
Each has its own `package.json` file.

These are further split into:
* Apps - the main projects (e.g. frontend & backend)
* Packages - shared libraries used by apps and other packages

Managing the monorepo is done using [pnpm](https://pnpm.io/) and [Turbopack](https://turbo.build/pack).

### Build System

The build system is based on [Vite](https://vitejs.dev/).

To simplify configuring vite, there is a `@price-prediction/vite-config` package which exports partial vite configs:
* `createBaseConfig` - base config for all subprojects
* `createLibraryConfig` - config for libraries
* `createSolidJSConfig` - config for SolidJS

Note: Each subproject must include the relevant vite plugins in `devDependencies`.
      See the config source files for the list of plugins.

Note: The package is built only as an ES module.
      This requires each dependency to be an ES module (`"type": "module"` in its `package.json`).
      If this is an issue, you can add `cjs` to `build.lib.formats` in `getLibraryConfig` and update `main` to point to the CommonJS build.
      (It currently sets `main` to an ES module to avoid Vite crashing.)
