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

    
};
