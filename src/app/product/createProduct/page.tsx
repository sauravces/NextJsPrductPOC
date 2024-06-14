"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {Card,CardContent,CardFooter,CardHeader,CardTitle,} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import useRequests from "../../service/request";
import { Separator } from "../../../components/ui/separator";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialValues = {
  name: "",
  description: "",
  price: null,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive"),
});

const CreateProduct = () => {
 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const endpoints = useRequests();
  const onSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    const formattedValues = {
      ...values,
      price: parseFloat(values.price),
    };
    try {
      const response = await axios.post(
        endpoints.createProduct,
        formattedValues
      );
      console.log(response);
      resetForm();
      router.push("/product/productList");
    } catch (error) {console.error(error);} finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
            <Card className={`p-4 m-10 bg-slate-50`}>
              <CardHeader>
                <CardTitle>Create Product</CardTitle>
              </CardHeader>
              <Separator className="my-2" />
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Field
                    disabled={isLoading}
                      as={Input}
                      id="name"
                      name="name"
                      placeholder="Name of your Product"
                      className="border border-gray-300 p-2 rounded"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Description</Label>
                    <Field
                    disabled={isLoading}
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
                    <Label htmlFor="name">Price</Label>
                    <Field
                    disabled={isLoading}
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
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isSubmitting || isLoading}>
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </CardFooter>
            </Card>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;