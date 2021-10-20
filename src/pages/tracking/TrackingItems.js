import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";
import { TrackingItem } from "./TrackingItem";

export const TrackingItems = (props) => {
  const [state, setState] = useState({
    items: [],
  });

  useEffect(() => {
    setState({
      ...state,
      items: props.items,
    });
  }, [props.items]);

  const listItems = state.items?.map((item,index) => (
    <TrackingItem
      key={index}
      item={item}
    />
  ));

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Qty/Sub</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {listItems}
      </Table>
    </>
  );
};
