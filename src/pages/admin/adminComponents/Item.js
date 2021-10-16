import React from "react";
import { Button, Table, Image } from "semantic-ui-react";
export const Item = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Table.Row>
      <Table.Cell>
        <Image
          style={{ margin: "0 auto" }}
          src={
            props.item?.image
              ? `data:image/png;base64,${props.item?.image}`
              : "/images/noproduct.png"
          }
          size="tiny"
        />
      </Table.Cell>
      <Table.Cell>{props.item?.name}</Table.Cell>
      <Table.Cell>{formatter.format(props.item?.price)}</Table.Cell>
      <Table.Cell>
        <div>
          <Button color="pink" onClick={props.onUpdateItem}>
            Edit
          </Button>
          <Button color="red" onClick={props.onDeleteItem}>
            Delete
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};
