import React, { useEffect, useState } from "react";
import { Button,Form, Header, Icon, Modal, Image } from "semantic-ui-react";
import QRCode from 'qrcode.react';
export const ShareModal = (props) => {
  useEffect(() => {
  }, []);
    
const [state, setState] = useState({
    buttonConten: 'Copy',
    link: window.location.href.replace('admin','shop')
});
    
     const copyLink = () => {
         navigator.clipboard.writeText(state.link);
         setState({
      ...state,
      buttonConten: 'Copied',
    });
        
    setTimeout(() => {
      setState({
      ...state,
      buttonConten: 'Copy',
    });
    }, 5000);
  };
    
  return (
    <Modal
      open={props.isShowModal}
      onClose={()=>props.onCloseShare()}
    >
      <Header icon="share" content='Share Shop' />
      <Modal.Content>
        <div style={{ textAlign: 'center'}}>
          <QRCode
            id='qrcode'
            value={state.link}
            size={290}
            level={'H'}
                      includeMargin={true} />
              </div>
              
              <Button
                  onClick={copyLink}
      basic
      color='blue'
      content={state.buttonConten}
      icon='fork'
      label={{
        as: 'a',
        basic: true,
        color: 'blue',
        pointing: 'left',
        content: '2,048',
      }}
    />
            
            
      </Modal.Content>
      <Modal.Actions>
       
        <Button color="green" onClick={()=>props.onCloseShare()}>
          <Icon name="checkmark" /> Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
