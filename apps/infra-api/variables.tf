variable "scaleway_region" {
  default = "nl-ams"
  type    = string
}

variable "local_docker_image_tag" {
  default = "price-prediction-api:latest"
  type    = string
}

variable "remote_docker_image_tag" {
  default = "api:latest"
  type    = string
}
