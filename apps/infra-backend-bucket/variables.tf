variable "scaleway_region" {
  default = "nl-ams"
  type    = string
}

variable "backend_bucket_name" {
  default = "price-prediction-terraform-state"
  type    = string
}
