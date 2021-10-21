import React, { useState, useEffect } from "react";
import { Button, Form, Image, Modal } from "semantic-ui-react";
import { itemApi } from "../../../../api/item.api";
import { useSelector, useDispatch } from "react-redux";

export const OrderDetailModal = (props) => {
  const auth = useSelector((state) => state.auth);
  const [state, setState] = useState({
    itemId: "",
    name: "",
    price: "",
    image: null,
    imageUrl: "",
    newImage: null,
    filename: "",
  });

 

  return (
    <Modal onClose={() => props.closeModal()} open={props.isShowModal}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Form>
        <Form.Field>
          <label>Name</label>
         
        </Form.Field>

        <Form.Field>
          <label>Price</label>
         
        </Form.Field>

        <Form.Field>
         
        </Form.Field>
      </Form>
      <br />
      <Modal.Actions>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
