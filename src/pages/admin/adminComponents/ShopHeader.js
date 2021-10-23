import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Segment, Button, Popup } from "semantic-ui-react";
import { Profile } from "../../../components/Profile";
import { ShareModal } from "../../../components/ShareModal";
export const ShopHeader = (props) => {
  const [state, setState] = useState({
    isShowModal: false,
  });

  const auth = useSelector((state) => state.auth);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    const button = document.getElementById("btn-copy");
    button.innerText = "Copied";
    setTimeout(() => {
      button.innerText = "Copy";
    }, 5000);
  };

  const shareShop = () => {
    setState({
      ...state,
      isShowModal: true,
    });
  };

  const onCloseShare = () => {
    setState({
      ...state,
      isShowModal: false,
    });
  };

  return (
    <>
      <ShareModal isShowModal={state.isShowModal} onCloseShare={onCloseShare} />
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <Profile shopInformation={props.shopInformation} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>Shop Link</Segment>
            <Segment>
              <a onClick={() => props.changeView()}>
                {" "}
                {props.isMenu ? "View Order" : "View Menu"}
              </a>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Button.Group size="small" style={{ maxHeight: "50%" }}>
              <Button positive onClick={copyLink} id="btn-copy">
                Copy
              </Button>
              <Button.Or />
              <Button primary onClick={() => shareShop()}>
                Share
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
