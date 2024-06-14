"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRequests from "../../service/request";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  name: string;
  description: string;
  price: number | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
});

const EditProduct = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const endpoints = useRequests();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    price: null,
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${endpoints.getProductById}/${productId}`);
      setInitialValues(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values:Product, { resetForm }:{ resetForm: () => void }) => {
    try {
      const response = await axios.put(`${endpoints.updateProductById}/${productId}`, values);
      resetForm();
      router.push("/product/productList");
      toast({
        title: "Successfully",
        description: "Product Updated Successfully.",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true} // To allow form to update when initialValues change
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Card className="p-4 m-10 bg-slate-50">
            <CardHeader>
              <CardTitle>Update Product Details</CardTitle>
            </CardHeader>
            <Separator className="my-2" />
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="Name of your project"
                    className="border border-gray-300 p-2 rounded"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Field
                    as={Input}
                    id="description"
                    name="description"
                    placeholder="Description of Product"
                    className="border border-gray-300 p-2 rounded"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price</Label>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
                    placeholder="Price of product"
                    className="border border-gray-300 p-2 rounded"
                  />
                  <ErrorMessage
                    name="price"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex ">
              <Button variant="outline"  onClick={()=>router.push("/product/productList")}>
                Cancel
              </Button>
              <Button className="ml-2" type="submit" disabled={isSubmitting}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default EditProduct;