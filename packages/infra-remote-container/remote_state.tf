data "terraform_remote_state" "container_namespace" {
  backend = "s3"
  config = {
    bucket                      = "price-prediction-terraform-state"
    endpoint                    = "https://s3.nl-ams.scw.cloud"
    key                         = "infra/container-namespace/terraform.tfstate"
    region                      = "nl-ams"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}
