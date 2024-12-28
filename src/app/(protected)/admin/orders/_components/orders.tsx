"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrdersInterface } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EditOrderFn } from "../../../../../../actions/product/edit-order-status";
import { useRouter } from "next/navigation";
import { useCurrentUserRole } from "../../../../../../hooks/use-current-user-role";

const Orders = ({ orders }: OrdersInterface) => {

  const userRole = useCurrentUserRole();
  const router = useRouter();
  useEffect(() => {
    if (userRole === "USER") router.push("/");
  }, []);

  const [orderStatus, setOrderStatus] = useState<
    "awaiting_shipment" | "shipped" | "fullfilled"
  >("awaiting_shipment");
  const handleEdit = (orderId: string) => {
    EditeOrder({ id: orderId, status: orderStatus! });
  };

  const { mutate: EditeOrder, isPending: isEditing } = useMutation({
    mutationKey: ["add-exam"],
    mutationFn: async (data: {
      id: string;
      status: "awaiting_shipment" | "shipped" | "fullfilled";
    }) => {
      const result = await EditOrderFn(data);
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async (data, variables) => {
      toast.success(data.success);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  console.log(orderStatus);

  return (
    <div className="container h-screen mx-auto p-10">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <Table className="p-5">
        <TableHeader className="bg-primary/10">
          <TableRow className="text-center bg-yellow-500 rounded-md">
            <TableHead className="w-1/6 text-white">Order ID</TableHead>
            <TableHead className="w-1/6 text-white">Total Amount</TableHead>
            <TableHead className="w-1/6 text-white">Status</TableHead>
            <TableHead className="w-1/6 text-white">Date</TableHead>
            <TableHead className="w-1/6 text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-gray-50 cursor-pointer text-center rounded-md divide-y divide-gray-200">
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-white transition-colors duration-200">
              <TableCell>{order.id}</TableCell>
              <TableCell>${order.amount}</TableCell>
              <TableCell>
                {order.status === "awaiting_shipment"
                  ? "Awaiting Shipment"
                  : order.status == "shipped"
                  ? "Shipped"
                  : "FullFilled"}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Status</Button>
                  </DialogTrigger>
                  <DialogContent className="h-[200px]">
                    <DialogHeader>
                      <DialogTitle>Edit Order Status</DialogTitle>
                    </DialogHeader>

                    <Label htmlFor="status">Status</Label>
                    {/* @ts-ignore */}
                    <Select value={orderStatus} onValueChange={setOrderStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Change Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awaiting_shipment">
                          Awaiting Shipment
                        </SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="FullFilled">FullFilled</SelectItem>
                      </SelectContent>
                    </Select>
                    <DialogFooter>
                      <Button
                        onClick={() => handleEdit(order.id)}
                        className="text-white">
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
