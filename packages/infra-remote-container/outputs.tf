output "registry_image" {
  value = local.registry_image
}

output "registry_image_hash" {
  value = data.docker_image.main.repo_digest
}

output "scaleway_container_namespace_id" {
  value = data.terraform_remote_state.container_namespace.outputs.scaleway_container_namespace_id
}
