import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderApi } from "../../api/order.api";
import { Grid, Segment,Icon, Label, Menu, Table,Image,Form  } from "semantic-ui-react";

export const TrackingItem = (props) => {
   var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
   });
  
  const [state, setState] = useState({
    item: null,
    index: 0
  });
  
  useEffect(() => {
    setState({
      ...state,
      item: props.item,
      index: props.index +1 ,
    });
  }, [props.item]);

  return (
    <>
    <Table.Body>
      <Table.Row>
          <Table.Cell>{state.index}</Table.Cell>
          <Table.Cell>
            <Image
          style={{ margin: "0 auto" }}
          src={
            props.item?.image
              ? `data:image/png;base64,${props.item?.image}`
              : "/images/noproduct.png"
          }
          size="tiny"
        /></Table.Cell>
          <Table.Cell>{state.item?.itemName}
            <br></br>
            {formatter.format(state.item?.price)}
          </Table.Cell>
          <Table.Cell style={{width: '20%'}}>
          <input
            value={state.item?.amount||0}
              disabled
              onChange={()=>{}}
            />
            <br></br>

            {formatter.format(state.item?.price * state.item?.amount )}
           </Table.Cell>
      </Table.Row>
    </Table.Body>
    </>
  );
};



