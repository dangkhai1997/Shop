import React, {useEffect, useState} from "react";
import { Button, Table, Image,Form } from "semantic-ui-react";
export const ItemIncart = (props) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [state, setState] = useState({
    src: '',
  });

  const handleChangeAmout = (e) => {
    const changeAmout = {
      customerId: props.item.customerId,
      itemId: props.item.itemId,
      newAmount: e.target.value
    }

    props.updateAmountCart(changeAmout);
  };

  const removeItem = () => {
    const changeAmout = {
      customerId: props.item.customerId,
      itemId: props.item.itemId,
      newAmount: 0
    }
    props.updateAmountCart(changeAmout);
  };

  useEffect(() => {
    const imageShop = document.getElementById(`shop_img_${props.item?.itemId}`);
    setState({
      ...state,
      src: imageShop.src,
    });
    
  }, [props.item]);

  return (
    <Table.Row>
      <Table.Cell>
        <Image
          style={{ margin: "0 auto" }}
          src={state.src}
          size="tiny"
        />
      </Table.Cell>
      <Table.Cell>{props.item?.itemName}
        <br/>
      {formatter.format(props.item?.price)}
      
      </Table.Cell>
      <Table.Cell>
        <Form.Field>
        <input value={props.item?.amount}
            onChange={handleChangeAmout}
            type="number"
            min="1"
        />
</Form.Field>
        <br/>
        {formatter.format(props.item?.price * props.item?.amount)}
      </Table.Cell>
      <Table.Cell>
        <div>
          
          <Button color="red"
          onClick={removeItem}>
             X
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
};
