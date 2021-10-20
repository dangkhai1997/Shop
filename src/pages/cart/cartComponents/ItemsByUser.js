import { ItemsIncart } from "./ItemsIncart";

import React, { useState, useEffect } from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";
import { ItemIncart } from "./ItemIncart";
import { Button } from "semantic-ui-react";

export const ItemsByUser = (props) => {
     var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
     });
    
  const [state, setState] = useState({
      items: [],
      total: 0,
  });

    useEffect(() => {
        initDataUser(props.itemsInCart);
    }, [props,props.itemsInCart]);
    
    const initDataUser = (itemsInCart) => {
        const user =  itemsInCart?.reduce((r, a)=> {
        r[a.customerId] = r[a.customerId] || [];
                r[a.customerId].push(a);
                
        return r;
            }, Object.create(null));
            

        const items = Object.values(user ?? []);
        
        // Caculate total
        let total = 0;
 if (itemsInCart && itemsInCart.length > 0) {
             total = itemsInCart?.map(i => i.price * i.amount).reduce((a, b) => a + b);
        }
        
        
            setState({
        ...state,
        items: items,
        total: total
    });
    };
   

  const itemsByUser = state.items?.map((item,index) => (
      <ItemsIncart
    updateAmountCart = {props.updateAmountCart}
      key={index}
      items={item}
    />
  ))
;

    return (
  <>
            {itemsByUser}
            <div style={{ float: 'left' }}>
                <Button primary>Submit</Button>
                Total: {formatter.format(state.total)}
            </div>
   </>
  );
};