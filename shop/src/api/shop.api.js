import { CALL } from "./service.api";

export const shopApi = {
  login: ({ phoneNumber }) =>
    CALL({
      method: "post",
      url: "https://localhost:5001/api/Shop/login",
      data: { phoneNumber },
    }),

  signup: ({ name, phoneNumber, image,fileName }) => {
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Logo", image, fileName);

    return CALL({
      method: "post",
      url: "https://localhost:5001/api/Shop/register",
      data: formData,
    });
  },

  getShop: ({ id }) =>
    CALL({
      method: "get",
      url: `https://localhost:5001/api/Shop/${id}`,
    }),
};
