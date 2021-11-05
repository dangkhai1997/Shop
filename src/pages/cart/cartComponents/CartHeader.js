import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Popup } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Profile } from "../../../components/Profile";
import { ShareModal } from "../../../components/ShareModal";

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
      <ShareModal isShowModal={state.isShowModal} onCloseShare={onCloseShare} />

      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column width={11}>
            <Segment color="brown">
              <Profile shopInformation={props.shop}></Profile>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment color="brown" className="admin-action-group">
              <Button
                basic
                fluid
                content="Share"
                icon="share"
                labelPosition="right"
                color="brown"
                onClick={() => shareCart()}
              ></Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
