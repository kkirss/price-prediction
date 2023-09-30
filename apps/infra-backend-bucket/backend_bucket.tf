resource "scaleway_object_bucket" "terraform_backend" {
  name = var.backend_bucket_name
}

#import {
#  to = scaleway_object_bucket.terraform_backend
#  id = "nl-ams/price-prediction-terraform-state"
#}

resource "scaleway_object_bucket_acl" "terraform_backend" {
  bucket = scaleway_object_bucket.terraform_backend.name
  acl    = "private"
}
