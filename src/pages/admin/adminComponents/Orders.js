import React, { useState, useEffect } from "react";
import { Header, Icon, Menu, Segment, Table } from "semantic-ui-react";
import { Order } from "./Order";
import { UpdateItemModal } from "./adminModals/UpdateItemModal";

export const Orders = (props) => {
  const [state, setState] = useState({
    isShowModal: false,
    currentItem: null,
    orders: [],
  });

  useEffect(() => {
    setState({
      ...state,
      orders: props.orders,
    });
  }, [props.orders]);

  const closeModal = () => {
    setState({
      ...state,
      isShowModal: false,
    });
  };

  const listOrder = state.orders?.map((item, index) => (
    <Order key={index} index={index} item={item} />
  ));

  return (
    <>
      <UpdateItemModal
        item={state.currentItem}
        isShowModal={state.isShowModal}
        closeModal={closeModal}
      />

      <Segment color="brown">
        <Segment basic clearing style={{ padding: "0px" }}>
          <Header as="h4" floated="left" color="brown">
            Shop Orders
          </Header>
        </Segment>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Customer Name</Table.HeaderCell>
              <Table.HeaderCell>Customer Phone</Table.HeaderCell>
              <Table.HeaderCell>Total </Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Order Time</Table.HeaderCell>
              <Table.HeaderCell> </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{listOrder}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    </>
  );
};
