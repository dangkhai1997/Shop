import { CALL } from "./service.api";

export const orderApi = {
  saveOrder: ({ cartId, deliveryInformation }) =>
    CALL({
      method: "post",
      url: "https://localhost:5001/api/Order",
      data: { cartId, deliveryInformation },
    }),

  getOrder: ({ orderId }) =>
    CALL({
      method: "get",
      url: `https://localhost:5001/api/Order/${orderId}`,
    }),

  getOrders: ({ shopId }) =>
    CALL({
      method: "get",
      url: `https://localhost:5001/api/Order/${shopId}/shop/all`,
    }),

  updateOrder: ({ orderId, orderStatus, customerId, shopId }) =>
    CALL({
      method: "put",
      url: "https://localhost:5001/api/Order/status",
      data: { orderId, orderStatus, customerId, shopId },
    }),

  cancelOrder: ({ orderId, customerId }) =>
    CALL({
      method: "put",
      url: "https://localhost:5001/api/Order/cancel",
      data: { orderId, customerId },
    }),
};
