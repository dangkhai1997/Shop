import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Popup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Profile1 } from "../../../components/Profile1";
import {ShareModal} from '../../../components/ShareModal'

export const CartHeader = (props) => {
const [state, setState] = useState({
    isShowModal: false,
});
  
  const onCloseShare = () => {
     setState({
      ...state,
      isShowModal: false,
    });
  };

  const shareCart = () => {
     setState({
      ...state,
      isShowModal: true,
    });
  };

  return (
    <>
      <ShareModal
        isShowModal={state.isShowModal}
        onCloseShare={onCloseShare}
      />
      <Grid columns={2} divided >
    <Grid.Row stretched>
      <Grid.Column>
        <Profile1 shopInformation={props.shop}></Profile1>
      </Grid.Column>
      <Grid.Column>
      <Segment>Cart Link</Segment>

       <Button primary onClick={() => shareCart()}
              >Share</Button>
      </Grid.Column>
     
    </Grid.Row>
      </Grid>
      </>
  );
};
