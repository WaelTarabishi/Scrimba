"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { AddProductFn } from "../../../../../actions/add-product";
import toast from "react-hot-toast";

const AddProudctComponentClient = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const category = ["clothes", "accessory"];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleAddProduct = () => {
    console.log("Adding product:", {
      title,
      description,
      price,
      selectedCategory,
      image,
    });

    mutate({
      title,
      description,
      price: parseFloat(price),
      category: selectedCategory,
      image,
      size,
      color,
    });
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (data: {
      title: string;
      price: number;
      size: string;
      description: string;
      category: string;
      color: string;
      image: string;
    }) => AddProductFn(data),
    onSuccess: () => {
      toast.success("Post added succesfully");
    },
    onError: () => {
      toast.error("Some thing went wrong");
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Product Name</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Select onValueChange={setSize} value={size}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="S">Small</SelectItem>
                <SelectItem value="M">Medium</SelectItem>
                <SelectItem value="L">Large</SelectItem>
                <SelectItem value="XL">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select onValueChange={setColor} value={color}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
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
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={setSelectedCategory}
              value={selectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {category.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <Button
            disabled={isPending}
            onClick={handleAddProduct}
            className="text-white">
            {isPending ? (
              <span
                className={`loader  inline-block h-[1em] w-[1em] border-[3px] border-white border-t-transparent rounded-full animate-spin`}></span>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProudctComponentClient;
