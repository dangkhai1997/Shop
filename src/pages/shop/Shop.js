import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux";
import { Button, Form, Image, Modal } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { cartApi } from "../../api/cart.api";
import { Message } from "../../constants/api-response.constants";
export const Shop = (props) => {
  const shopId = props.location.pathname.split("/")[2] || "";
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    isShowModal: false,
    notify: "",
  });

  const history = useHistory();
  useEffect(async () => {
    const cart = await cartApi.createCart({
      customerId: authUser.user.customerId,
      shopId,
    });

    if (cart && cart.isSuccess) {
      history.push(`/cart/${cart.cartId}`);
      return;
    }

    if (cart.errorMessage === Message.ExistCartWithShop) {
      setState({
        ...state,
        isShowModal: true,
        notify: Message.ExistCartWithShop,
      });

      history.push(`/cart/${cart.cartId}`);
    }
  }, []);

  const closeModal = async () => {
    const cart = await cartApi.getCartExist({
      customerId: authUser.user.customerId,
      shopId,
    });

    if (cart && cart.isSuccess) {
      history.push(`/cart/${cart.cartId}`);
      return;
    }

    setState({
      ...state,
      isShowModal: false,
    });
  };

  const notifyModal = (
    <Modal centered={false} open={state.isShowModal} onClose={closeModal}>
      <Modal.Header>Notify!</Modal.Header>
      <Modal.Content>
        <Modal.Description>{state.notify}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={closeModal}>OK</Button>
      </Modal.Actions>
    </Modal>
  );

  return <>{notifyModal}</>;
};
