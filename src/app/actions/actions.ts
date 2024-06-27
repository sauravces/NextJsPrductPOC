"use server";
import { revalidatePath } from "next/cache";
import useRequests from "@/app/service/request";
import { ProductSchema } from "@/lib/schema";

const endpoints = useRequests();

export async function handleServerAction(newProduct: unknown) {
  const result1 = ProductSchema.safeParse(newProduct);
  if (!result1.success) {
    let errorMessage = "";
    result1.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.path[0] + ": " + issue.message + ". ";
    });

    return {
      error: errorMessage,
    };
  }
  try {
    const response = await fetch(endpoints.createProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result1.data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();

    revalidatePath("/ssr/productlist");
    return {
      success: true,
      message: `Added product ${result1.data.name}`,
      product: result,
    };
  } catch (e) {
    console.error("Error creating product:", e);
    return { success: false, message: "Failed to create product" };
  }
}
