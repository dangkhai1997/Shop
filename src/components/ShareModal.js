import React, { useEffect, useState } from "react";
import { Button, Form, Header, Icon, Modal, Image } from "semantic-ui-react";
import QRCode from "qrcode.react";
export const ShareModal = (props) => {
  useEffect(() => {}, []);

  const [state, setState] = useState({
    buttonContent: "Copy",
    link: window.location.href.replace("admin", "shop"),
  });

  const copyLink = () => {
    navigator.clipboard.writeText(state.link);
    setState({
      ...state,
      buttonContent: "Copied",
    });

    setTimeout(() => {
      setState({
        ...state,
        buttonContent: "Copy",
      });
    }, 5000);
  };

  return (
    <Modal
      open={props.isShowModal}
      onClose={() => props.onCloseShare()}
      size={"tiny"}
      dimmer
    >
      <Modal.Header>Share</Modal.Header>
      <Modal.Content>
        <div style={{ textAlign: "center" }}>
          <QRCode
            id="qrcode"
            value={state.link}
            size={290}
            level={"H"}
            includeMargin={true}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={copyLink}
          color="brown"
          content={state.buttonContent}
          icon="fork"
        />
      </Modal.Actions>
    </Modal>
  );
};
