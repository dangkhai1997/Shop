import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Segment, Icon, Label, Menu, Table } from "semantic-ui-react";
import { DeliveryStatus } from "./DeliveryStatus";

export const TrackingHeader = (props) => {

  const [state, setState] = useState({
    information: null,
  });
  
    useEffect(() => {
      setState({
      ...state,
      information: props.information,
    });
  }, [props.information]);

  return (
      <>
          <h2>Order Status Tracking (realtime)</h2>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Grid style={{width: '50%'}}>
            <Grid.Row></Grid.Row>
            <Grid.Row>
            <Grid.Column>
              <Segment>Shop Name: { state.information?.shopName}</Segment>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
               <Segment>phone number: { state.information?.phongNumberOfShop}</Segment>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        
         <DeliveryStatus status={state.information?.status}></DeliveryStatus>

          </div>
     
      
    </>
  );
};