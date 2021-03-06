import React, { useState, useEffect } from "react";
import { cartApi } from "../../api/cart.api";
import { CartHeader } from "./cartComponents/CartHeader";
import { ShopItems } from "./cartComponents/ShopItems";
import { useSelector, useDispatch } from "react-redux";
import { ItemsByUser } from "./cartComponents/ItemsByUser";
import { LogLevel, HubConnectionBuilder } from "@microsoft/signalr";
import { Button, TextArea, Image, Modal, Form, Grid } from "semantic-ui-react";
import { orderApi } from "../../api/order.api";
import { useHistory } from "react-router-dom";
import { Hub } from "../../constants/hub.enpoint.constants";

export const Cart = (props) => {
  const history = useHistory();
  const cartId = props.location.pathname.split("/")[2] || "";
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    cartInformation: null,
    deletedItems: [],
    isShowModal: false,
    deliveryInformation: "",
    hub: null,
    submitedItem: null,
  });

  const fetchInformation = async (cartId) => {
    const cartInformation = await cartApi.getCart({ cartId });

    setState((prevState) => ({
      ...prevState,
      cartInformation: cartInformation,
      submitedItem: null,
    }));
  };

  useEffect(() => {
    fetchInformation(cartId);
  }, []);

  const addToCartFromSignal = ({
    customerId,
    itemId,
    newAmount,
    customerName,
  }) => {
    // newAmount alway -1
    const itemInshop = getItem(itemId);

    const itemInCart = {
      price: itemInshop.price,
      customerId,
      cartId: cartId,
      itemId: itemId,
      isDeleted: false,
      readyToOrder: false,
      customerName,
      itemName: itemInshop.itemName,
      itemIsActive: true,
    };

    addCart(itemInCart);
  };

  const addToCart = (item) => {
    const itemInCart = {
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

    sendUpdateItemAmount({
      customerId: authUser.user.customerId,
      customerName: authUser.user.name,
      itemId: item.itemId,
      newAmount: -1,
    });
    addCart(itemInCart);
  };

  const addCart = (itemInCart) => {
    const isExistUserCart = state.cartInformation?.itemsInCart.find(
      (c) =>
        c.itemId === itemInCart.itemId && c.customerId === itemInCart.customerId
    );
    isExistUserCart ? updateCart(itemInCart) : addNewCart(itemInCart);
  };

  const updateCart = (itemInCart) => {
    const cartInformation = { ...state.cartInformation };
    const oldItem = cartInformation?.itemsInCart.find(
      (c) =>
        c.itemId === itemInCart.itemId && c.customerId === itemInCart.customerId
    );
    oldItem.amount += 1;

    setState({
      ...state,
      cartInformation: cartInformation,
    });
  };

  const addNewCart = (itemInCart) => {
    const item = { ...itemInCart, amount: 1 };
    const cartInformation = { ...state.cartInformation };
    if (item.customerId === authUser.user.customerId) {
      const lastestItem = cartInformation.itemsInCart.find(
        (i) => i.customerId === itemInCart.customerId
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

  const updateAmountCart = ({
    customerId,
    itemId,
    newAmount,
    isUpdateFromSignal,
  }) => {
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

    // Send signal update UpdateItemAmount
    !isUpdateFromSignal &&
      sendUpdateItemAmount({ customerId, itemId, newAmount });

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
    if (state.submitedItem && state.submitedItem?.items.length > 0) {
      const items = state.submitedItem?.items;
      items.forEach((item) => {
        const oldItem = state.cartInformation?.itemsInCart?.find(
          (c) =>
            c.customerId === state.submitedItem.customerId &&
            c.itemId === item.itemId
        );
        if (oldItem) {
          oldItem.amount = item.amount;
          oldItem.isDeleted = item.isDeleted;
          oldItem.readyToOrder = true;
        }
      });
    }
  }, [state.submitedItem]);

  useEffect(() => {
    if (state.changedItem) {
      if (state.changedItem.amount === -1) {
        addToCartFromSignal({
          customerId: state.changedItem.customerId,
          itemId: state.changedItem.itemId,
          newAmount: -1,
          customerName: state.changedItem.customerName,
        });
        return;
      }

      updateAmountCart({
        ...state.changedItem,
        newAmount: state.changedItem.amount,
        isUpdateFromSignal: true,
      });
    }
  }, [state.changedItem]);

  useEffect(async () => {
    const submitItemsHandler = (item) => {
      if (item.customerId !== authUser.user.customerId) {
        setState((prevState) => ({
          ...prevState,
          submitedItem: item,
        }));
      }
    };

    const receiveUpdateItemAmount = (data) => {
      if (data.customerId !== authUser.user.customerId) {
        debugger;
        setState((prevState) => ({
          ...prevState,
          changedItem: data,
        }));
      }
    };

    const createHubConnection = async () => {
      const hubConnect = new HubConnectionBuilder()
        .withUrl(`${Hub.Cart}${cartId}`, {
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

      hubConnect.on("SubmitItems", submitItemsHandler);
      hubConnect.on("UpdateItemAmount", receiveUpdateItemAmount);

      return hubConnect;
    };

    const hubConnect = await createHubConnection();

    setState((prevState) => ({
      ...prevState,
      hub: hubConnect,
    }));

    return () =>
      hubConnect.then((hubConnect) => {
        hubConnect.off("SubmitItems", submitItemsHandler);
        hubConnect.off("UpdateItemAmount", receiveUpdateItemAmount);
      });
  }, []);

  const getPrice = (itemId) => {
    return (
      state.cartInformation?.shop.items.find((i) => i.itemId === itemId)
        ?.price || 0
    );
  };

  const getItem = (itemId) => {
    debugger;
    return state.cartInformation?.shop.items.find((i) => i.itemId === itemId);
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

  const sendUpdateItemAmount = ({
    customerId,
    itemId,
    newAmount,
    customerName,
  }) => {
    state.hub?.invoke("UpdateItemAmount", {
      customerId: customerId,
      customerName,
      itemId: itemId,
      cartId: cartId,
      amount: parseInt(newAmount),
    });
  };

  return (
    <>
      <Modal centered={false} open={state.isShowModal} onClose={closeModal}>
        <Modal.Header>Notify!</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {state.cartInformation?.customerId !== authUser.user.customerId ? (
              `Submit successfully, please wait until the cart's host completed!`
            ) : (
              <>
                <Form>
                  Enter your delivery Information:
                  <TextArea
                    placeholder="delivery information"
                    onChange={handleChange}
                  />
                </Form>
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

      <Grid style={{ marginTop: "10px" }}>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column width={8}>
          <CartHeader shop={state.cartInformation?.shop}></CartHeader>
          <ShopItems
            items={state.cartInformation?.shop?.items?.filter(i=>i.isActive)}
            addToCart={addToCart}
          ></ShopItems>
        </Grid.Column>
        <Grid.Column width={4}>
          <ItemsByUser
            itemsInCart={state.cartInformation?.itemsInCart}
            updateAmountCart={updateAmountCart}
            cartId={cartId}
            deletedItems={state.deletedItems}
            orderCart={orderCart}
            hostId={state.cartInformation?.customerId}
          ></ItemsByUser>
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid>
    </>
  );
};
