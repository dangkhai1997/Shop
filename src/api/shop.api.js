import { CALL } from "./service.api";

export const shopApi = {
  login: ({ phoneNumber, name }) =>
    CALL({
      method: "post",
      url: "https://localhost:5001/api/Shop/login",
      data: { phoneNumber, name },
    }),
};
