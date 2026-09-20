export function getLocalProducts() {
  const saved = localStorage.getItem("storeapp-custom-products");
  return saved ? JSON.parse(saved) : [];
}

export function saveLocalProducts(items: any[]) {
  localStorage.setItem("storeapp-custom-products", JSON.stringify(items));
}
