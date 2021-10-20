import React, { useState, useEffect } from "react";
import { cartApi } from "../../api/cart.api";
import { CartHeader } from "./cartComponents/CartHeader";
import { ShopItems } from "./cartComponents/ShopItems";
import { useSelector, useDispatch } from "react-redux";
import { ItemsByUser } from "./cartComponents/ItemsByUser";
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr";

export const Cart = (props) => {
  const cartId = props.location.pathname.split("/")[2] || "";
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    cartInformation: null,
    deletedItems: [],
  });

  const fetchInformation = async (cartId) => {
    const cartInformation = await cartApi.getCart({ cartId });
    setState({
      ...state,
      cartInformation: cartInformation,
    });
  };

  useEffect(() => {
    fetchInformation(cartId);
    startCons();
  }, []);

  const addToCart = (item) => {
    const itemIncart = {
      price: item.price,
      customerId: authUser.user.customerId,
      cartId: cartId,
      itemId: item.itemId,
      isDeleted: false,
      readyToOrder: false,
      customerName: authUser.user.name,
      itemName: item.name,
      itemIsActive: true,
    };

    addCart(itemIncart);
    // @TODO: Hard code de hien 2 cai
    //addCart({ ...itemIncart, customerId: 1, customerName: 'hard code name' });
  };

  const addCart = (itemIncart) => {
    console.log(state.cartInformation);

    const isExistUserCart = state.cartInformation?.itemsInCart.find(
      (c) =>
        c.itemId === itemIncart.itemId && c.customerId === itemIncart.customerId
    );
    isExistUserCart ? updateCart(itemIncart) : addNewCart(itemIncart);
  };

  const updateCart = (itemIncart) => {
    const cartInformation = { ...state.cartInformation };
    const oldItem = cartInformation?.itemsInCart.find(
      (c) =>
        c.itemId === itemIncart.itemId && c.customerId === itemIncart.customerId
    );
    oldItem.amount += 1;

    setState({
      ...state,
      cartInformation: cartInformation,
    });
  };

  const addNewCart = (itemIncart) => {
    const item = { ...itemIncart, amount: 1 };
    const cartInformation = { ...state.cartInformation };
    if (item.customerId === authUser.user.customerId) {
      const lastestItem = cartInformation.itemsInCart.find(
        (i) => i.customerId === itemIncart.customerId
      );

      const index = cartInformation.itemsInCart.lastIndexOf(lastestItem);
      index !== -1
        ? cartInformation.itemsInCart.splice(
            cartInformation.itemsInCart.length - index,
            0,
            item
          )
        : cartInformation.itemsInCart.unshift(item);
    } else {
      cartInformation.itemsInCart.push(item);
    }

    setState({
      ...state,
      cartInformation: cartInformation,
    });
  };

  const updateAmountCart = ({ customerId, itemId, newAmount }) => {
    if (newAmount === "") {
      return;
    }
    const cartInformation = { ...state.cartInformation };
    const deletedItems = [...state.deletedItems];

    const oldItem = cartInformation?.itemsInCart.find(
      (c) => c.itemId === itemId && c.customerId === customerId
    );
    if (!oldItem) {
      return;
    }

    if (newAmount > 0) {
      oldItem.amount = parseInt(newAmount);
    } else {
      const deleteItem = cartInformation?.itemsInCart.find(
        (c) => c.itemId === itemId && c.customerId === customerId
      );

      deletedItems.push(deleteItem);

      // Remove from cart
      const index = cartInformation?.itemsInCart.findIndex(
        (c) => c.itemId === itemId && c.customerId === customerId
      );

      if (index > -1) {
        cartInformation?.itemsInCart.splice(index, 1);
      } else if (index === 0) {
        cartInformation?.itemsInCart.shift();
      }
    }

    setState({
      ...state,
      cartInformation: cartInformation,
      deletedItems: deletedItems,
    });
  };

  const startCons = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:5001/hubs/cart?cart=${cartId}`, {
        withCredentials: false,
      })
      .configureLogging(LogLevel.Information)
      .build();

    try {
      await connection.start();
    } catch (e) {
      console.log(e);
    }

    connection.on("AddItemToCart", (item) => {
      console.log(state.cartInformation);
      // addToCartFromSignal(item);
      //   setState({
      //   ...state,
      //   test: item,
      // });
    });
    connection.on("UnsubmitItems", (message) => {
      console.log("you just unsubmtited cart id: " + message);
    });
  };

  const addToCartFromSignal = (item) => {
    const price = getPrice(item.itemId);

    const itemIncart = {
      price: price,
      customerId: item.customerId,
      cartId: cartId,
      itemId: item.itemId,
    };

    console.log(itemIncart);

    addToCart(itemIncart);
  };

  const getPrice = (itemId) => {
    return (
      state.cartInformation?.shop.items.find((i) => i.itemId === itemId)
        ?.price || 0
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "57%", height: "100%" }}>
          <CartHeader shop={state.cartInformation?.shop}></CartHeader>
          <ShopItems
            items={state.cartInformation?.shop?.items}
            addToCart={addToCart}
          ></ShopItems>
        </div>
        <div style={{ width: "42%", height: "100%" }}>
          <ItemsByUser
            itemsInCart={state.cartInformation?.itemsInCart}
            updateAmountCart={updateAmountCart}
            cartId={cartId}
            deletedItems={state.deletedItems}
          ></ItemsByUser>
        </div>
      </div>
    </>
  );
};
