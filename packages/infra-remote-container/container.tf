locals {
  registry_image = "${data.terraform_remote_state.container_namespace.outputs.scaleway_registry_namespace_endpoint}/${var.remote_docker_image_tag}"
}

resource "docker_tag" "remote" {
  source_image = var.local_docker_image_tag
  target_image = local.registry_image
}

data "docker_image" "main" {
  name = local.registry_image
}

resource "docker_registry_image" "remote" {
  name = local.registry_image
  triggers = {
    hash = data.docker_image.main.repo_digest,
  }
}
