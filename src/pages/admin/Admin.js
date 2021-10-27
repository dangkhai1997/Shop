import React, { useState, useEffect } from "react";
import { ShopHeader } from "./adminComponents/ShopHeader";
import { Items } from "./adminComponents/Items";
import { shopApi } from "../../api/shop.api";
import { Orders } from "./adminComponents/Orders";
import { orderApi } from "../../api/order.api";
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr";

export const Admin = (props) => {
  const shopId = props.location.pathname.split("/")[2] || "";

  const [state, setState] = useState({
    shopInformation: null,
    isMenu: true,
    orders: [],
    addedOrder: null
  });

  const fetchInformation = async (shopId) => {
    const shopInformation = await shopApi.getShop({ id: shopId });
    shopInformation.items = shopInformation.items?.filter((i) => i.isActive);

    setState({
      ...state,
      shopInformation: shopInformation,
    });
  };

  const fetchOrders = async () => {
    const response = await orderApi.getOrders({ shopId });
    setState({
      ...state,
      orders: response.orders,
    });
  };

  useEffect(() => {
    fetchInformation(shopId);
    startCons();
  }, []);

  useEffect(() => {
    !state.isMenu && fetchOrders(shopId);
  }, [state.isMenu]);

  const changeView = () => {
    setState({
      ...state,
      isMenu: !state.isMenu,
    });
  };

  const startCons = async () => {
    const shopId = window.location.href.split("/")[4];
    const url = `https://localhost:5001/hubs/shop?shop=${shopId}`;
    const connection = new HubConnectionBuilder()
      .withUrl(url, {
        withCredentials: false,
      })
      .configureLogging(LogLevel.Information)
      .build();

    try {
      await connection.start();
    } catch (e) {
      console.log(e);
    }

    connection.on("NewOrder", (response) => {
      
      console.log(response);
      setState((prevState) => ({
        ...prevState,
        addedOrder: response,
      }));
    });
  };

  useEffect(() => {
    if (state.addedOrder && state.addedOrder.orderId) {
      state.orders.push(state.addedOrder);
    }
  }, [state.addedOrder]);

  return (
    <div>
      <ShopHeader
        shopInformation={state.shopInformation}
        changeView={changeView}
        isMenu={state.isMenu}
      />
      {state.isMenu ? (
        <Items items={state.shopInformation?.items} />
      ) : (
        <Orders orders={state.orders} />
      )}
    </div>
  );
};
