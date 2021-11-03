import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Segment, Button } from "semantic-ui-react";
import { Profile } from "../../../components/Profile";
import { ShareModal } from "../../../components/ShareModal";
export const ShopHeader = (props) => {
  const [state, setState] = useState({
    isShowModal: false,
    isCopied: false,
  });

  const auth = useSelector((state) => state.auth);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    if (!state.isCopied) {
      setState({
        ...state,
        isCopied: true,
      });
    }
  };

  useEffect(() => {
    if (state.isCopied) {
      const timeout = setTimeout(() => {
        setState({
          ...state,
          isCopied: false,
        });
      }, 5000);

      return timeout;
    }
  }, [state.isCopied]);

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
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column width={11}>
            <Segment color="brown">
              <Profile shopInformation={props.shopInformation} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}>
            <Segment color="brown" className="admin-action-group">
              <Button
                fluid
                id="btn-copy"
                content={state.isCopied ? "Copied" : "Copy Link"}
                icon="copy outline"
                labelPosition="right"
                color={state.isCopied ? "orange" : "brown"}
                onClick={copyLink}
              ></Button>

              <Button
                fluid
                content="Share"
                icon="share"
                labelPosition="right"
                color="brown"
                onClick={() => shareShop()}
              ></Button>

              {props.isMenu && (
                <Button
                  fluid
                  color="brown"
                  content="Shop Order"
                  icon="list"
                  labelPosition="right"
                  onClick={() => props.changeView()}
                ></Button>
              )}

              {!props.isMenu && (
                <Button
                  fluid
                  color="brown"
                  content="Shop Menu"
                  icon="clipboard list"
                  labelPosition="right"
                  onClick={() => props.changeView()}
                ></Button>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};
