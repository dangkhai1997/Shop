import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment,Icon, Label, Menu, Table  } from "semantic-ui-react";

export const TrackingItem = (props) => {
  const [state, setState] = useState({
    item: null,
  });
  
  useEffect(() => {
    setState({
      ...state,
      item: props.item,
    });
  }, [props.item]);

  return (
    <>
    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
    </>
  );
};



