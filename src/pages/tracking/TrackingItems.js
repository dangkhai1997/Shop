import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";
import { TrackingItem } from "./TrackingItem";

export const TrackingItems = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [state, setState] = useState({
    items: [],
    total: 0
  });

  useEffect(() => {
    initData();
   
  }, [props.items]);

  const initData = () => {
    let itemIds = props.items?.map(i => i.itemId);
    itemIds = [...new Set(itemIds)];
    const items = [];

    itemIds.forEach(itemId => {
      const itemsByItemId = props.items?.filter(i => i.itemId === itemId);
      const itemByItemId = { ...itemsByItemId[0], amount: itemsByItemId.map(i=>i.amount).reduce((a,b) => a+b) };
      items.push(itemByItemId);
    });

    let total = 0;
    if (itemIds.length > 0) {
      total = items
        ?.map((i) => i.price * i.amount)
        .reduce((a, b) => a + b);
    }

    setState({
          ...state,
      items: items,
          total:total
        });
  }

  const listItems = state.items?.map((item,index) => (
    <TrackingItem
      key={item.itemId}
      item={item}
      index={index}
    />
  ));

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Qty/Sub</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {listItems}

        <Table.Row >
            <Table.Cell  colspan="3"></Table.Cell>
            <Table.Cell>
            Total: {formatter.format(state.total)}
            </Table.Cell>
          </Table.Row>

      </Table>
      <br></br>
    </>
  );
};
