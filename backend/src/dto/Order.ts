import mongoose from "mongoose";

export type orderItemDTO = {
  productId: mongoose.Schema.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
};

export type ShippingAddressDTO = {
  fullName: string;
  address: string;
  city: string;
};

export type orderDTO = {
  userId: mongoose.Schema.Types.ObjectId;
  items: orderItemDTO[];
  shippingDetails: ShippingAddressDTO;
  totalQuantity: number;
  totalPrice: number;
};
