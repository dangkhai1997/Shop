import React, { useState, useEffect } from "react";
import { Header, Icon, Label, Menu, Segment, Table } from "semantic-ui-react";
import { Item } from "./Item";
import { UpdateItemModal } from "./adminModals/UpdateItemModal";
import { DeleteModal } from "./adminModals/DeleteModal";
import { Button } from "semantic-ui-react";

export const Items = (props) => {
  const [state, setState] = useState({
    isShowModal: false,
    currentItem: null,
    items: [],
    isShowDeleteModal: false,
  });

  const onUpdateItem = (itemId) => {
    const item = state.items.find((i) => i.itemId === itemId);
    setState({
      ...state,
      isShowModal: true,
      currentItem: item,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      items: props.items,
    });
  }, [props.items]);

  const closeModal = () => {
    setState({
      ...state,
      isShowModal: false,
    });
  };

  const updateToList = (newItem) => {
    const { itemId } = newItem;
    const oldItem = state.items.find((i) => i.itemId === itemId);

    if (oldItem) {
      oldItem.name = newItem.name;
      oldItem.price = newItem.price;
      oldItem.image = newItem.image;
      return;
    }

    state.items.push(newItem);
  };

  const showDeleteModal = (isShow) => {
    setState({
      ...state,
      isShowDeleteModal: isShow,
    });
  };

  const onDeleteItem = (itemId) => {
    const item = state.items.find((i) => i.itemId === itemId);
    setState({
      ...state,
      currentItem: item,
      isShowDeleteModal: true,
    });
  };

  const deleteItemSucessfully = (itemId) => {
    const newItems = state.items.filter((i) => i.itemId !== itemId);

    setState({
      ...state,
      items: newItems,
      isShowDeleteModal: false,
    });
  };

  const listItems = state.items?.map((item) => (
    <Item
      key={item.itemId}
      item={item}
      onUpdateItem={() => onUpdateItem(item.itemId)}
      onDeleteItem={() => onDeleteItem(item.itemId)}
    />
  ));

  return (
    <>
      <UpdateItemModal
        item={state.currentItem}
        isShowModal={state.isShowModal}
        closeModal={closeModal}
        updateToList={updateToList}
      />

      <DeleteModal
        isShowDeleteModal={state.isShowDeleteModal}
        item={state.currentItem}
        showDeleteModal={showDeleteModal}
        deleteItemSucessfully={deleteItemSucessfully}
      />

      <Segment color="brown">
        <Segment basic clearing style={{ padding: "0px" }}>
          <Header as="h4" floated="left" color="brown">
            Shop Items
          </Header>
          <Button
            size={"tiny"}
            color="brown"
            floated="right"
            content="Add New Item"
            icon="add"
            labelPosition="left"
            onClick={onUpdateItem}
          />
        </Segment>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>Picture</Table.HeaderCell>
              <Table.HeaderCell width={5}>Name</Table.HeaderCell>
              <Table.HeaderCell width={3}>Price</Table.HeaderCell>
              <Table.HeaderCell width={2}></Table.HeaderCell>
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
      </Segment>
    </>
  );
};
