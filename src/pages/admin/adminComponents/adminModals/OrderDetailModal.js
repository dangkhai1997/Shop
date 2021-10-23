import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Image,
  Modal,
  Grid,
  Segment,
  Dropdown,
  Label,
  Table,
} from "semantic-ui-react";
import { itemApi } from "../../../../api/item.api";
import { useSelector, useDispatch } from "react-redux";
import { OrderStatus } from "../../../../constants/order.constants";
import { orderApi } from "../../../../api/order.api";

export const OrderDetailModal = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

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
    total: 0,
  });

  useEffect(() => {
    const total = props.item?.itemsInCart?.map((i) => i.price * i.amount)
    .reduce((a, b) => a + b);

    setState({
      ...state,
      item: props.item,
      total: total,
    });
  }, [props.item]);

  const hanldeChangeStatus = (e) => {
    setState({
      ...state,
      item: { ...state.item, status: e.target.innerText },
    });
  };

  const updateStatus = async () => {
    const payload = {
      orderId: state.item.orderId,
      orderStatus: state.item.status,
      customerId: state.item.customerId,
      shopId: state.item.shopId,
    };
    await orderApi.updateOrder(payload);
    props.closeModal();
  };

  const cancelOrder = async () => {
    const payload = {
      orderId: "",
      customerId: state.item.customerId,
    };
    await orderApi.cancelOrder(payload);
    props.closeModal();
  };

  const items = props.item?.itemsInCart?.map((item, index) => (
    <Table.Row key={index}>
      <Table.Cell>{item.itemName}</Table.Cell>
      <Table.Cell>{formatter.format(item.price)}</Table.Cell>
      <Table.Cell>{item.amount}</Table.Cell>
      <Table.Cell>{formatter.format(item.price * item.amount)}</Table.Cell>
    </Table.Row>
  ));

  return (
    <Modal onClose={() => props.closeModal()} open={props.isShowModal}>
      <Modal.Header>View Order</Modal.Header>
      <>
        <Grid columns={3}>
          <Grid.Row stretched style={{fontSize:'1.5rem',fontWeight: '600'}}>
            <Grid.Column>
              Order Number #12345
              <br />
              Customer Name: aa
              <br />
              Customer Phone 090xxxxxxx
            </Grid.Column>

            <Grid.Column>
              <Segment>Order status: {state.item?.status}</Segment>
              <Segment>
                Delivery Information: {state.item?.deliveryInformation}
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                style={{ maxHeight: "40%" }}
                clearable
                options={options}
                selection
                onChange={hanldeChangeStatus}
              />
              <Segment style={{ maxHeight: "40%", marginTop: "2rem" }}>
                order time: {props.time}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Qty</Table.HeaderCell>
              <Table.HeaderCell>Sub Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{items}</Table.Body>
          <Table.Row >
            <Table.Cell  colspan="3"></Table.Cell>
            <Table.Cell>
            Total: {formatter.format(state.total)}
            </Table.Cell>
          </Table.Row>
        </Table>
        
      </>
      <br />
      <Modal.Actions>
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
