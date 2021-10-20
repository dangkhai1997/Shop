import React from "react";
import { Button, Table, Image } from "semantic-ui-react";
export const Order = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Table.Row>
      <Table.Cell>
       #12345
      </Table.Cell>
      <Table.Cell>Michale scop</Table.Cell>
      <Table.Cell>090xxxxx</Table.Cell>
      <Table.Cell>{formatter.format(11.50)}</Table.Cell>
      <Table.Cell>Confirmed</Table.Cell>
      <Table.Cell>13:00</Table.Cell>
      <Table.Cell><a>View</a></Table.Cell>
    </Table.Row>
  );
};
