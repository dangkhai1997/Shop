import { CALL } from "./service.api";

export const cartApi = {
  getCart: ({ cartId }) =>
    CALL({
      method: "get",
      url: `https://localhost:5001/api/Cart/${cartId}?getShop=true`,
    }),

  submitCart: ({ items, customerId, cartId }) =>
    CALL({
      method: "post",
      url: `https://localhost:5001/api/Cart/submit`,
      data: { items, customerId, cartId },
    }),

  createCart: ({ customerId, shopId }) =>
    CALL({
      method: "post",
      url: `https://localhost:5001/api/Cart/create`,
      data: { customerId, shopId },
    }),

  getCartExist: ({ customerId, shopId }) =>
    CALL({
      method: "post",
      url: `https://localhost:5001/api/Cart/exist/shop/customer`,
      data: { customerId, shopId },
    }),

  addItem: ({ itemId, customerId, cartId }) =>
    CALL({
      method: "post",
      url: `https://localhost:5001/api/Cart/add/item`,
      data: { itemId, customerId, cartId },
    }),
};
