import React, { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { ShopItem } from "./ShopItem";

export const ShopItems = (props) => {
  const [state, setState] = useState({
    items: [],
  });

  useEffect(() => {
    setState({
      ...state,
      items: props.items,
    });
  }, [props.items]);

  const listItems = state.items?.map((item) => (
    <ShopItem
      key={item.itemId}
      item={item}
      addToCart={() => props.addToCart(item)}
    />
  ));

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>Picture</Table.HeaderCell>
            <Table.HeaderCell width={5}>Name</Table.HeaderCell>
            <Table.HeaderCell width={3}>Price</Table.HeaderCell>
            <Table.HeaderCell width={3}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{listItems}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
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
    </>
  );
};
