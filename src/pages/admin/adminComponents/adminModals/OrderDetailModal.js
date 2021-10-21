import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Image,
  Modal,
  Grid,
  Segment,
  Dropdown,
} from "semantic-ui-react";
import { itemApi } from "../../../../api/item.api";
import { useSelector, useDispatch } from "react-redux";
import { OrderStatus } from "../../../../constants/order.constants";
import { orderApi } from "../../../../api/order.api";

export const OrderDetailModal = (props) => {
  const options = [
    { key: 1, text: OrderStatus.Confirmed, value: OrderStatus.Confirmed },
    {
      key: 2,
      text: OrderStatus.SendToKitchen,
      value: OrderStatus.SendToKitchen,
    },
    {
      key: 3,
      text: OrderStatus.ReadyForPickup,
      value: OrderStatus.ReadyForPickup,
    },
    { key: 4, text: OrderStatus.Delivered, value: OrderStatus.Delivered },
  ];

  const auth = useSelector((state) => state.auth);
  const [state, setState] = useState({
    item: null,
  });

  useEffect(() => {
    setState({
      ...state,
      item: props.item,
    });
  }, [props.item]);

  const hanldeChangeStatus = (e) => {
    setState({
      ...state,
      item: { ...state.item, status: e.target.innerText },
    });
  };

  const updateStatus = async() => {
    const payload = {
      orderId: "6df52a",
      orderStatus: state.item.status,
      customerId: state.item.customerId,
      shopId: state.item.shopId,
    };
    await orderApi.updateOrder(payload);
    props.closeModal();
  };

  const cancelOrder = async() => {
    const payload = {
      orderId: "",
      customerId: state.item.customerId,
    };
    await orderApi.cancelOrder(payload);
    props.closeModal();
  };
  

  return (
    <Modal onClose={() => props.closeModal()} open={props.isShowModal}>
      <Modal.Header>View Order</Modal.Header>
      <>
        <Grid columns={3}>
          <Grid.Row stretched>
            <Grid.Column>
              Order Number #12345
              <br />
              Customer Name: aa
              <br />
              Customer Phone 090xxxxxxx
            </Grid.Column>

            <Grid.Column>
              <Segment>order stt: {state.item?.status}</Segment>
              <Segment>order time: {props.time}</Segment>
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                clearable
                options={options}
                selection
                onChange={hanldeChangeStatus}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
      <br />
      <Modal.Actions>
        <Button
          content="Cancel Order"
          labelPosition="right"
          icon="close"
          color="youtube"
          onClick={cancelOrder}

        />
        <Button
          content="Update"
          labelPosition="right"
          icon="checkmark"
          positive
          onClick={updateStatus}
        />
      </Modal.Actions>
    </Modal>
  );
};
