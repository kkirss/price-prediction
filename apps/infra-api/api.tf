module "remote_container" {
  source = "../../packages/infra-remote-container"

  local_docker_image_tag  = var.local_docker_image_tag
  remote_docker_image_tag = var.remote_docker_image_tag
}

resource "scaleway_container" "api" {
  name            = "price-prediction-api"
  namespace_id    = module.remote_container.scaleway_container_namespace_id
  registry_image  = module.remote_container.registry_image
  registry_sha256 = module.remote_container.registry_image_hash
  deploy          = true

  min_scale    = 0
  max_scale    = 1
  cpu_limit    = 500  // mvCPU
  memory_limit = 1024 // MB

  port        = 8080
  protocol    = "h2c"
  http_option = "redirected"
  privacy     = "public"

  depends_on = [
    module.remote_container
  ]
}
