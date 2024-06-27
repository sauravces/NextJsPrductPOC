import useRequests from "@/app/service/request";
import ProductTable from "../../../components/productlist";
import { Product } from "@/lib/types";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function SSRProducts() {

  const endpoints = useRequests();
  let products: Product[] = [];
  
  try {

    const response = await fetch(endpoints.getAllProducts);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    products = data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
    }));

  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return <ProductTable initialProducts={products} />;
}
