terraform {
  required_version = ">= 1.5.7"
  required_providers {
    scaleway = {
      source  = "scaleway/scaleway"
      version = ">= 2.28.0"
    }
  }
}

provider "scaleway" {
  region = var.scaleway_region
  zone   = "${var.scaleway_region}-1"
}
