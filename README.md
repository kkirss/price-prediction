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

### Backend

* [Express](https://expressjs.com/) _(web server)_

### Infrastructure

* [Terraform](https://www.terraform.io/) _(infrastructure as code)_
* [Scaleway](https://www.scaleway.com/) _(cloud provider)_

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

#### Run Docker Locally

The backend is deployed as a Docker container.
You can test the container locally using:
```bash
pnpm run serve-docker
```
Note: This doesn't start the frontend.

## Deploy

### Frontend

To deploy the web frontend to GitHub Pages:
```bash
pnpm run deploy:web
```

### Backend

NB: For some reason, the backend container doesn't work in Scaleway.
    It returns 502 Bad Gateway with "unexpected EOF".
    Based on logs, it seems the container never gets the request in the first place.

#### Requirements

* [Docker](https://www.docker.com/products/docker-desktop)
* [terraform](https://www.terraform.io/downloads.html)
* [scaleway-cli](https://github.com/scaleway/scaleway-cli#installation)

Note: Currently only works on Windows (depends on `pwsh` in `apps/infra-api/providers.tf`).

#### Scaleway

We use Scaleway as the cloud provider.
To deploy to Scaleway, you need to:
1. [Create a Scaleway account/organization](https://www.scaleway.com/en/docs/console/my-account/quickstart/)
2. [Create a Scaleway project (or use the default one)](https://www.scaleway.com/en/docs/console/my-project/how-to/create-a-project/)
3. [Create a Scaleway API key](https://www.scaleway.com/en/docs/identity-and-access-management/iam/how-to/create-api-keys/)

#### Credentials

Put Scaleway credentials in `~/.config/scw/config.yaml`:
```yaml
profiles:
  price-prediction-prod:
    access_key: scaleway_access_key
    secret_key: scaleway_secret_key
    default_organization_id: scaleway_organization_id
    default_project_id: scaleway_project_id
```

Additionally, put Scaleway credentials in `~/.aws/credentials`:
```ini
[scaleway-price-prediction-prod]
aws_access_key_id = scaleway_access_key
aws_secret_access_key = scaleway_secret_key
```
(Need this because Terraform uses the AWS S3 backend.)

#### Deployment

To deploy the backend to Scaleway:
```bash
pnpm run deploy:backend
```

### Destroy Infrastructure

To destroy the infrastructure:
```bash
pnpm run infra-destroy
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

Note: The package is not run in watch mode when running `pnpm run dev`.
      This improves performance, but means that changes to the config will not be picked up until the next build.

### Infrastructure

The infrastructure is managed using [Terraform](https://www.terraform.io/).
This allows defining the infrastructure as code (IaC).

We use [Scaleway](https://www.scaleway.com/) as the cloud provider.
Using it because it's cheap, has good features and has a Terraform provider.
