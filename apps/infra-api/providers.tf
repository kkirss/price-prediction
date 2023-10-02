terraform {
  required_version = ">= 1.5.7"
  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = ">= 2.28.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = ">= 3.0.2"
    }
    external = {
      source  = "hashicorp/external"
      version = ">= 2.3.1"
    }
  }
}

provider "scaleway" {
  region = var.scaleway_region
  zone   = "${var.scaleway_region}-1"
}

# Hacky way to get the credentials from the Scaleway CLI
data "external" "scaleway_access_key" {
  program = ["pwsh", "-c", "echo", "'{' '\"access_key\":' \"$(scw --profile price-prediction-prod config get access-key --output json)\" '}'"]
}
data "external" "scaleway_secret_key" {
  program = ["pwsh", "-c", "echo", "'{' '\"secret_key\":' \"$(scw --profile price-prediction-prod config get secret-key --output json)\" '}'"]
}
locals {
  scaleway_access_key = sensitive(data.external.scaleway_access_key.result.access_key)
  scaleway_secret_key = sensitive(data.external.scaleway_secret_key.result.secret_key)
}

# Docker provider requires setting the registry auth,
#  regardless of whether docker is already authenticated or not.
provider "docker" {
  registry_auth {
    address  = "rg.${var.scaleway_region}.scw.cloud"
    username = local.scaleway_access_key
    password = local.scaleway_secret_key
  }
}
