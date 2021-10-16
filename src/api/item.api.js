import { CALL } from "./service.api";

export const itemApi = {
  createItem: ({ shopId, name, price, image, fileName }) => {
    const formData = new FormData();
    formData.append("ShopId", shopId);
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Image", image, fileName);

    return CALL({
      method: "post",
      url: "https://localhost:5001/api/Item/create",
      data: formData,
    });
  },

  updateItem: ({ shopId, itemId, name, price, image, fileName }) => {
    const formData = new FormData();
    formData.append("ShopId", shopId);
    formData.append("ItemId", itemId);
    formData.append("Name", name);
    formData.append("Price", price);
    formData.append("Image", image, fileName);

    return CALL({
      method: "put",
      url: "https://localhost:5001/api/Item",
      data: formData,
    });
  },

  deleteItem: ({ shopId, itemId }) =>
    CALL({
      method: "delete",
      url: `https://localhost:5001/api/Item`,
      data: { shopId, itemId },
    }),
};
