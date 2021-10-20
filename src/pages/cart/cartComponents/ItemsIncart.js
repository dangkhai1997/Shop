import React, { useState, useEffect } from "react";
import { Icon, Label, Menu, Table,Checkbox } from "semantic-ui-react";
import { ItemIncart } from "./ItemIncart";
import { Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

export const ItemsIncart = (props) => {
  const authUser = useSelector((state) => state.authUser);

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
    <ItemIncart
      key={item.itemId}
      item={item}
      updateAmountCart= {props.updateAmountCart}
    />
  ));

  return (
    <>
        
      <div style={{ float: 'left' }}>
        <Label as='a' image style={{ marginRight:'2rem'}}>
          <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
          {state.items[0]?.customerName}
          </Label>
        
        {authUser.user.customerId !== state.items[0]?.customerId &&
        <Checkbox toggle label='Completed' disabled checked />
      }
        
        </div>
     
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Picture</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell> </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{listItems}</Table.Body>
      </Table>
    </>
  );
};
