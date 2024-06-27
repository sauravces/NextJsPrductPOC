"use client";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from "../../../components/ui/table";
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from "../../../components/ui/alert-dialog";
import { Typography,Stack,IconButton,CircularProgress,Box} from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "../../../components/ui/button";
import { useRouter} from "next/navigation";
import useRequests from "../../service/request";
import axios from "axios";

interface Product {
  id:string,
  name: string;
  description: string;
  price: number | null;
}

export default function ProductTable() {
  const endpoints = useRequests();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(endpoints.getAllProducts);
      setLoading(false);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (product:Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleDeleteClick = (product:Product, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteDialogOpen(true);
    setSelectedProduct(product);
  };

  const handleDeleteConfirm = async () => {
    if (selectedProduct) {
      try {
        await axios.delete(
          `${endpoints.deleteProductById}/${selectedProduct.id}`
        );
        setProduct(product.filter((p) => p.id !== selectedProduct.id));
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row" sx={{ padding: "7px", alignItems: "center" }}>
        <Typography sx={{ padding: "20px", font: "bold", flexGrow: 1 }}>
          Products
        </Typography>
        <Button size="sm" onClick={() => router.push("/product/createProduct")}>
          Create Product
        </Button>
      </Stack>
      <Table className="m-2 p-3 rounded-s border-black outline-1 shadow-md">
        <TableHeader className="bg-slate-50 ">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Stack direction="row" onClick={() => handleEditClick(product)}>
                  <IconButton size="small">
                    <EditIcon sx={{ color: "#42a5f5" }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(event) => handleDeleteClick(product, event)}
                  >
                    <DeleteIcon sx={{ color: "#ef5350" }} />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
