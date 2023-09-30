terraform {
  backend "s3" {
    bucket                      = "price-prediction-terraform-state"
    endpoint                    = "https://s3.nl-ams.scw.cloud"
    key                         = "infra/api/terraform.tfstate"
    region                      = "nl-ams"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}
