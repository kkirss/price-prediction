variable "scaleway_region" {
  default = "nl-ams"
  type    = string
}

variable "scaleway_profile" {
  default = "price-prediction-prod"
  type    = string
}

variable "local_docker_image_tag" {
  type = string
}

variable "remote_docker_image_tag" {
  type = string
}
