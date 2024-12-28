"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductInterface } from "@/types";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";
import { DeleteProductFn } from "../../../../../../actions/product/delete-product";
import { EditProductFn } from "../../../../../../actions/product/edit-product";
import DefaultImage from "../../../../../../public/loin.png";
const Products = ({ products }: ProductInterface) => {
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (product: ProductInterface) => {
    setEditingProduct(product);
  };

  const { mutate: DeleteProduct, isPending: isDeleting } = useMutation({
    mutationKey: ["add-exam"],
    mutationFn: async (id: string) => {
      const result = await DeleteProductFn(id);
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async (data, variables) => {
      toast.success(data.success);
    },
    onError: (error: Error) => {
      //console.log(error);
      toast.error(error.message || "يرجى ادخال البيانات بشكل صحيح");
    },
  });

  const handleDelete = (id: string) => {
    console.log(`Deleting product with id: ${id}`);
    DeleteProduct(id);
  };

  const handleSave = (updatedProduct: ProductInterface) => {
    console.log("Saving updated product:", updatedProduct);
    setEditingProduct(null);
  };

  return (
    <div className="container h-screen mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <Table className="p-5">
        <TableHeader className="bg-primary/10 ">
          <TableRow className="text-center bg-yellow-500  rounded-md  ">
            <TableHead className="w-1/6 text-white">Image</TableHead>
            <TableHead className="w-1/6 text-white">Title</TableHead>
            <TableHead className="w-1/6 text-white">Price</TableHead>
            <TableHead className="w-1/6 text-white">Color</TableHead>
            <TableHead className="w-1/6 text-white">Category</TableHead>
            <TableHead className="w-1/6 text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-50 cursor-pointer  text-center rounded-md divide-y divide-gray-200">
          {products?.map((product) => (
            <TableRow
              key={product.id}
              className="hover:bg-white transition-colors duration-200">
              <TableCell className="flex items-center justify-center">
                <Image
                  placeholder="blur"
                  src={DefaultImage}
                  alt={product?.title ? product?.title : "product"}
                  className="w-16 h-16 object-cover"
                />
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>{product.color}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(true);
                        //@ts-ignore
                        handleEdit(product);
                      }}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                    </DialogHeader>
                    <ProductForm
                      product={editingProduct}
                      onSave={handleSave}
                      setIsDialogOpen={setIsDialogOpen}
                    />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="ml-2">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the product.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-white"
                        onClick={() => handleDelete(product.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const ProductForm = ({
  product,
  onSave,
  setIsDialogOpen,
}: {
  product: ProductInterface | null;
  onSave: (product: ProductInterface) => void;
  setIsDialogOpen: any;
}) => {
  const [formData, setFormData] = useState(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price"
        ? e.target.value === ""
          ? 0
          : Number(e.target.value)
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const { mutate: EditeProduct, isPending: isEditing } = useMutation({
    mutationKey: ["add-exam"],
    mutationFn: async (data: {
      id: string;
      title: string;
      price: number;
      size: string;
      image: string;
      description: string;
      category: string;
      color: string;
    }) => {
      const result = await EditProductFn(data);
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async (data, variables) => {
      toast.success(data.success);
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      //console.log(error);
      toast.error(error.message || "يرجى ادخال البيانات بشكل صحيح");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as ProductInterface);
    // @ts-ignore
    EditeProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <Input
          id="title"
          name="title"
          //@ts-ignore
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter product title"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <Input
          id="price"
          name="price"
          //@ts-ignore
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          type="number"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <Input
          id="category"
          name="category"
          //@ts-ignore
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter product category"
        />
      </div>

      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        {/* @ts-ignore */}
        <Select
          name="color"
          onValueChange={(value) =>
            //@ts-ignore
            handleChange({ target: { name: "color", value } })
          }
          //@ts-ignore
          value={formData.color}>
          <SelectTrigger>
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="black">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-black  mr-2"></div>
                black
              </div>
            </SelectItem>
            <SelectItem value="white">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-white border mr-2"></div>
                white
              </div>
            </SelectItem>
            <SelectItem value="red">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                Red
              </div>
            </SelectItem>
            <SelectItem value="blue">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                Blue
              </div>
            </SelectItem>
            <SelectItem value="green">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                Green
              </div>
            </SelectItem>
            {/* Add more color options as needed */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <Input
          id="description"
          name="description"
          //@ts-ignore
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
        />
      </div>

      <Button type="submit" disabled={isEditing} className="text-white">
        {isEditing ? (
          <span
            className={`loader  inline-block h-[1em] w-[1em] border-[3px] border-white border-t-transparent rounded-full animate-spin`}></span>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
};

export default Products;
