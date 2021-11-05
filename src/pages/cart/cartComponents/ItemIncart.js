import React, { useEffect, useState } from "react";
import { Button, Table, Image, Icon, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";

export const ItemInCart = (props) => {
  const authUser = useSelector((state) => state.authUser);
  const [state, setState] = useState({
    src: "",
  });

  const handleChangeAmout = (e) => {
    const changeAmout = {
      customerId: props.item.customerId,
      itemId: props.item.itemId,
      newAmount: e.target.value,
    };

    props.updateAmountCart(changeAmout);
  };

  const removeItem = () => {
    const changeAmout = {
      customerId: props.item.customerId,
      itemId: props.item.itemId,
      newAmount: 0,
    };
    props.updateAmountCart(changeAmout);
  };

  useEffect(() => {
    const imageShop = document.getElementById(`shop_img_${props.item?.itemId}`);
    setState({
      ...state,
      src: imageShop?.src,
    });
  }, [props.item]);

  return (
    <Table.Row>
      <Table.Cell width={12}>
        <Header as="h4" image>
          <Image src={state.src} rounded size="small" />
          <Header.Content>
            {props.item?.itemName}
            <Header.Subheader>
              <Button
                fluid
                color={"red"}
                animated
                disabled={authUser.user.customerId !== props.item?.customerId}
                onClick={removeItem}
                size={"mini"}
                style={{ marginTop: "5px" }}
              >
                <Button.Content visible>Delete Item</Button.Content>
                <Button.Content hidden>
                  <Icon name="cart arrow down" />
                </Button.Content>
              </Button>
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell width={4}>
        <input
          style={{ width: "100%" }}
          value={props.item?.amount}
          onChange={handleChangeAmout}
          type="number"
          min="1"
          disabled={authUser.user.customerId !== props.item?.customerId}
        />
      </Table.Cell>
    </Table.Row>
  );
};
