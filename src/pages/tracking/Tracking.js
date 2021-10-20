import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment,Icon, Label, Menu, Table  } from "semantic-ui-react";

export const Tracking = (props) => {
  const orderId = props.location.pathname.split("/")[2] || "";

  const [state, setState] = useState({
    information: null,
  });

  const fetchInformation = async () => {
    const information = await orderApi.getOrder({ orderId });
    setState({
      ...state,
      information: information,
    });
  };
  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Segment>Order Status Tracking (realtime)</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={3} divided>
        <Grid.Row>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>Shop Name: Shop 1</Segment>
          </Grid.Column>
         
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Segment>phone number: 123123123</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>#</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Qty/Sub</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
    </>
  );
};
