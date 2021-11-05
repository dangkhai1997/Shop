import React, { useState, useEffect } from "react";
import { Label, Table, Segment } from "semantic-ui-react";
import { ItemInCart } from "./ItemInCart";
import { useSelector } from "react-redux";

export const ItemsInCart = (props) => {
  const authUser = useSelector((state) => state.authUser);

  const [state, setState] = useState({
    items: [],
    isCompleted: false,
  });

  useEffect(() => {
    const isCompleted = props.items?.some((i) => i.readyToOrder) || false;

    setState({
      ...state,
      items: props.items,
      isCompleted: isCompleted,
    });
  }, [props.items]);

  const listItems = state.items?.map((item) => (
    <ItemInCart
      key={item.itemId}
      item={item}
      updateAmountCart={props.updateAmountCart}
    />
  ));

  return (
    <Segment color="brown">
      <Label
        size="large"
        as="a"
        content={state.items[0]?.customerName}
        icon={state.isCompleted ? "check" : "user circle"}
        color={state.items[0]?.customerId === props.hostId ? "orange" : "grey"}
      />

      <Table basic="very" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{listItems}</Table.Body>
      </Table>
    </Segment>
  );
};
