import { CALL } from "./service.api";

export const orderApi = {
    saveOrder: ({ cartId, deliveryInformation }) =>
    CALL({
      method: "post",
      url: "https://localhost:5001/api/Order",
      data: { cartId, deliveryInformation },
    }),

    getOrder: ({ orderId}) =>
    CALL({
      method: "get",
      url: `https://localhost:5001/api/Order/${orderId}`,
    }),

    getOrders: ({ shopId}) =>
    CALL({
      method: "get",
      url: `https://localhost:5001/api/Order/${shopId}/shop/all`,
    }),
    
};
