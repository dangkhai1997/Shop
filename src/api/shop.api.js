import { CALL } from "./service.api";

export const shopApi = {
  login: ({ phoneNumber}) =>
    CALL({
      method: "post",
      url: "https://localhost:5001/api/Shop/login",
      data: { phoneNumber },
    }),
};
