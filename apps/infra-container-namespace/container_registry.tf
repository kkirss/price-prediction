resource "scaleway_registry_namespace" "main" {
  name      = var.namespace_name
  is_public = false
}
