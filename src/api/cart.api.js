import { CALL } from "./service.api";

export const cartApi = {
  getCart: ({ cartId }) =>
    CALL({
      method: "get",
        url: `https://localhost:5001/api/Cart/${cartId}?getShop=true`,
    }),
};
