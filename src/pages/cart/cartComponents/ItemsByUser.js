import { ItemsIncart } from "./ItemsIncart";

import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { cartApi } from "../../../api/cart.api";

export const ItemsByUser = (props) => {
  const authUser = useSelector((state) => state.authUser);
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [state, setState] = useState({
    items: [],
    total: 0,
  });

  useEffect(() => {
    initDataUser(props.itemsInCart);
  }, [props, props.itemsInCart]);

  const initDataUser = (itemsInCart) => {
    const cartItems =  [...itemsInCart?.filter(i=>i.customerId === authUser.user.customerId) || [], ...itemsInCart?.filter(i=>i.customerId !== authUser.user.customerId)|| []]

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

    setState({
      ...state,
      items: items,
      total: total,
    });
  };

  const submitCart = async() => {
    const deletedItems = getDeletedItems();
    const data = {
      items: [...props.itemsInCart, ...deletedItems],
      customerId: authUser.user.customerId,
      cartId: props.cartId,
    };

    const response = await cartApi.submitCart(data);
    response?.isSuccess && props.orderCart();
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
    <ItemsIncart
      updateAmountCart={props.updateAmountCart}
      key={index}
      items={item}
    />
  ));

  return (
    <>
      {itemsByUser}
      <div style={{ float: "left" }}>
        <Button primary onClick={submitCart}>
          Submit
        </Button>
        Total: {formatter.format(state.total)}
      </div>
    </>
  );
};
