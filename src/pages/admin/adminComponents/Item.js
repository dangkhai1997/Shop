import React from "react";
import { Button, Table, Image, Icon } from "semantic-ui-react";
import { formatter } from "../../../helper/helper";

export const Item = (props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Image
          centered
          size="small"
          src={
            props.item?.image
              ? `data:image/png;base64,${props.item?.image}`
              : "/images/noproduct.png"
          }
        />
      </Table.Cell>
      <Table.Cell className="table-cell">
        <span>{props.item?.name}</span>
      </Table.Cell>
      <Table.Cell className="table-cell">
        <span>{formatter.format(props.item?.price)}</span>
      </Table.Cell>
      <Table.Cell className="table-cell" centered>
        <Button
          animated="vertical"
          color="orange"
          size={"mini"}
          onClick={props.onUpdateItem}
        >
          <Button.Content hidden>Edit</Button.Content>
          <Button.Content visible>
            <Icon name="pencil alternate" />
          </Button.Content>
        </Button>

        <Button
          animated="vertical"
          size={"mini"}
          color="red"
          onClick={props.onDeleteItem}
        >
          <Button.Content hidden>Delete</Button.Content>
          <Button.Content visible>
            <Icon name="remove" />
          </Button.Content>
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};
