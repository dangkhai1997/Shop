import { ItemsInCart } from "./ItemsInCart";

import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { cartApi } from "../../../api/cart.api";
import { Message } from "../../../constants/api-response.constants";
import { formatter } from "../../../helper/helper";

export const ItemsByUser = (props) => {
  const authUser = useSelector((state) => state.authUser);
  const [state, setState] = useState({
    items: [],
    total: 0,
    isCurrentUserCompleted: false,
  });

  useEffect(() => {
    initDataUser(props.itemsInCart);
  }, [props, props.itemsInCart]);

  const initDataUser = (itemsInCart) => {
    const cartItems = [
      ...(itemsInCart?.filter(
        (i) => i.customerId === authUser.user.customerId
      ) || []),
      ...(itemsInCart?.filter(
        (i) => i.customerId !== authUser.user.customerId
      ) || []),
    ];

    const user = cartItems?.reduce((r, a) => {
      r[a.customerId] = r[a.customerId] || [];
      r[a.customerId].push(a);

      return r;
    }, Object.create(null));

    let items = Object.values(user ?? []);
    // Caculate total
    let total = 0;
    if (itemsInCart && itemsInCart.length > 0) {
      total = itemsInCart
        ?.map((i) => i.price * i.amount)
        .reduce((a, b) => a + b);
    }

    const isCurrentUserCompleted = itemsInCart?.some(
      (i) => i.customerId === authUser.user.customerId && i.readyToOrder
    );

    setState({
      ...state,
      items: items,
      total: total,
      isCurrentUserCompleted: isCurrentUserCompleted,
    });
  };

  const submitCart = async () => {
    const deletedItems = getDeletedItems();
    const data = {
      items: [
        ...props.itemsInCart?.filter(
          (i) => i.customerId === authUser.user.customerId
        ),
        ...deletedItems,
      ],
      customerId: authUser.user.customerId,
      cartId: props.cartId,
    };

    const response = await cartApi.submitCart(data);
    (response?.isSuccess ||
      response?.errorMessage === Message.CartStillUnsubmitted) &&
      props.orderCart();
  };

  const getDeletedItems = () => {
    const deletedItems = props.deletedItems?.filter(
      (d) =>
        !props.itemsInCart
          ?.filter((i) => i.customerId === authUser.user.customerId)
          .map((i) => i.itemId)
          .includes(d.itemId)
    );
    deletedItems.forEach((item) => {
      item.isDeleted = true;
    });

    return deletedItems;
  };

  const itemsByUser = state.items?.map((item, index) => (
    <ItemsInCart
      updateAmountCart={props.updateAmountCart}
      key={index}
      items={item}
      hostId={props.hostId}
    />
  ));

  return (
    <>
      {itemsByUser}
      <Button as="div" labelPosition="right" style={{ width: "100%" }}>
        <Button
          fluid
          color="blue"
          onClick={submitCart}
          disabled={
            state.isCurrentUserCompleted &&
            props.hostId !== authUser.user.customerId
          }
          style={{ width: "210px" }}
        >
          <Icon name="send" />
          {props.hostId !== authUser.user.customerId
            ? "Submit"
            : "Submit Order"}
        </Button>
        <Label
          as="a"
          basic
          color="blue"
          pointing="left"
          style={{ width: "100%" }}
        >
          {formatter.format(state.total)}
        </Label>
      </Button>
    </>
  );
};
