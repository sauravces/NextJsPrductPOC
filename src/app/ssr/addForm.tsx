"use client";
import { useRouter } from "next/navigation";
import { handleServerAction } from "../actions/actions";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ProductSchema } from "@/lib/schema";

function AddProductForm() {
  const { toast } = useToast();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const clientAction = async (formData: FormData) => {
    const newProduct = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
    };
    const result = ProductSchema.safeParse(newProduct);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });
      toast({
        variant: "destructive",
        description: `${errorMessage}`,
      });
      return;
    }
    console.log(result.data);
    const { success, error } = await handleServerAction(result.data);
    if (error) {
      toast({
        variant: "destructive",
        description: `${error}`,
      });
    }
    if (success) {
      router.push("/ssr/productlist");
    }
  };

  return (
    <>
      <h1>Server Action Page</h1>
      <form ref={ref} action={clientAction} method="post">
        <input
          style={{ backgroundColor: "gray", marginLeft: "10px" }}
          placeholder="product name"
          type="text"
          name="name"
        />
        <input
          style={{ backgroundColor: "gray", marginLeft: "10px" }}
          placeholder="product description"
          type="text"
          name="description"
        />
        <input
          style={{ backgroundColor: "gray", marginLeft: "10px" }}
          placeholder="product price"
          type="number"
          name="price"
        />
        <button style={{ marginLeft: "10px" }}>Submit</button>
      </form>
    </>
  );
}
export default AddProductForm;
