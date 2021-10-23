import React, { useState, useEffect } from "react";
import { cartApi } from "../../api/cart.api";
import { CartHeader } from "./cartComponents/CartHeader";
import { ShopItems } from "./cartComponents/ShopItems";
import { useSelector, useDispatch } from "react-redux";
import { ItemsByUser } from "./cartComponents/ItemsByUser";
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr";
import { Button, TextArea, Image, Modal } from "semantic-ui-react";
import { orderApi } from "../../api/order.api";
import { useHistory } from "react-router-dom";

export const Cart = (props) => {
  const history = useHistory();
  const cartId = props.location.pathname.split("/")[2] || "";
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    cartInformation: null,
    deletedItems: [],
    isShowModal: false,
    deliveryInformation: "",
  });

  const fetchInformation = async (cartId) => {
    const cartInformation = await cartApi.getCart({ cartId });
    setState({
      ...state,
      cartInformation: cartInformation,
      changeItem: null,
    });
  };

  useEffect(() => {
    fetchInformation(cartId);
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
  };

  const addCart = (itemIncart) => {
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

  useEffect(() => {
    if(state.changeItem && state.changeItem?.items.length> 0){
      const items = state.changeItem?.items;
      items.forEach(item => {
        const oldItem =  state.cartInformation?.itemsInCart?.find(c=>c.customerId === state.changeItem.customerId && c.itemId === item.itemId);
        if(oldItem){
          oldItem.amount = item.amount;
          oldItem.isDeleted = item.isDeleted;
          oldItem.readyToOrder = true;
        }
      });
    }
  }, [state.changeItem]);

  useEffect(async () => {
    const addToCartHandler = (item) => {
      console.log(state.cartInformation);
    };

    const submitItemsHandler = (item) => {
      if (item.customerId !== authUser.user.customerId) {
        setState((prevState) => ({
          cartInformation: prevState.cartInformation,
          changeItem: item,
        }));
      }
    };

    const createHubConnection = async () => {
      const hubConnect = new HubConnectionBuilder()
        .withUrl(`https://localhost:5001/hubs/cart?cart=${cartId}`, {
          withCredentials: false,
        })
        .configureLogging(LogLevel.Information)
        .build();
      try {
        await hubConnect.start();
        console.log("Connection successful!");
      } catch (err) {
        alert(err);
        return Promise.reject(err);
      }

      hubConnect.on("AddItemToCart", addToCartHandler);
      hubConnect.on("SubmitItems", submitItemsHandler);
      
      return hubConnect;
    };

    const hubConnect = await createHubConnection();

    return () =>
      hubConnect.then((hubConnect) => {
        hubConnect.off("AddItemToCart", addToCartHandler);
        hubConnect.off("SubmitItems", submitItemsHandler);
      });
  }, []);

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

  const orderCart = () => {
    setState({
      ...state,
      isShowModal: true,
    });
  };

  const closeModal = () => {
    setState({
      ...state,
      isShowModal: false,
    });
  };

  const saveOrder = async () => {
    const order = await orderApi.saveOrder({
      cartId,
      deliveryInformation: state.deliveryInformation,
    });

    if (order.isSuccess) {
      history.push(`/tracking/${order.orderId}`);
    }

    setState({
      ...state,
      isShowModal: false,
    });
  };

  const handleChange = (e) => {
    setState({
      ...state,
      deliveryInformation: e.target.value,
    });
  };

  return (
    <>
      <Modal centered={false} open={state.isShowModal} onClose={closeModal}>
        <Modal.Header>Notify!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {state.cartInformation?.customerId !== authUser.user.customerId ? (
              `submit successfully, please wait until the cart's host completed`
            ) : (
              <>
                Enter your deliveryInformation:
                <TextArea
                  placeholder="deliveryInformation"
                  onChange={handleChange}
                />
              </>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={saveOrder}>
            {state.cartInformation?.customerId !== authUser.user.customerId
              ? "Oke"
              : "Order"}
          </Button>
        </Modal.Actions>
      </Modal>

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
            orderCart={orderCart}
            hostId={state.cartInformation?.customerId}
          ></ItemsByUser>
        </div>
      </div>
    </>
  );
};
