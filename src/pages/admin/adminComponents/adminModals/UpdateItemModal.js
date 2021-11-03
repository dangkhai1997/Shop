import React, { useState, useEffect } from "react";
import { Button, Form, Image, Modal } from "semantic-ui-react";
import { itemApi } from "../../../../api/item.api";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux";

var CurrencyFormat = require("react-currency-format");

export const UpdateItemModal = (props) => {
  const dispatch = useDispatch();

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

  const loadDefaultValue = () => {
    setState({
      itemId: props.item?.itemId || "",
      name: props.item?.name || "",
      price: props.item?.price || "",
      image: props.item?.image || null,
      imageUrl: "",
      newImage: null,
      filename: "",
    });
  };

  useEffect(() => {
    if (props.isShowModal) {
      loadDefaultValue();
    }
  }, [props.isShowModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onFileChange = (event) => {
    const filename = event.target.files[0].name;
    const value = event.target.files[0];
    const imageUrl = URL.createObjectURL(value);
    const { name } = event.target;
    setState({
      ...state,
      [name]: value,
      imageUrl: imageUrl,
      filename: filename,
    });
  };

  const saveItem = () => {
    if (state.name === "" || state.price === "" || !state.newImage) {
      dispatch(actions.startToast("Please enter name, price, image !"));
      return;
    }

    state.itemId !== "" ? updateItem() : insertItem();
  };

  const updateItem = async () => {
    const payLoad = {
      shopId: auth.user.shopId,
      itemId: state.itemId,
      name: state.name,
      price: parseFloat(`${state.price}`.replace("$", "").replaceAll(",", "")),
      image: state.newImage,
      fileName: state.filename,
    };

    const newItem = await itemApi.updateItem(payLoad);
    newItem.itemId = state.itemId;
    props.updateToList(newItem);
    props.closeModal();
  };
  const insertItem = async () => {
    const payLoad = {
      shopId: auth.user.shopId,
      name: state.name,
      price: parseFloat(state.price.replace("$", "").replaceAll(",", "")),
      image: state.newImage,
      fileName: state.filename,
    };

    const newItem = await itemApi.createItem(payLoad);
    props.updateToList(newItem);
    props.closeModal();
  };

  return (
    <Modal onClose={() => props.closeModal()} open={props.isShowModal} dimmer>
      <Modal.Header>Modify Item</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={state.name}
            />
          </Form.Field>

          <Form.Field>
            <label>Price</label>
            <CurrencyFormat
              thousandSeparator={true}
              prefix={"$"}
              onChange={handleChange}
              placeholder="Price"
              name="price"
              value={state.price}
            />
          </Form.Field>

          <input
            type="file"
            id="myFile"
            onChange={onFileChange}
            name="newImage"
            style={{ marginBottom: "10px" }}
          />

          <Image
            src={
              state.imageUrl !== ""
                ? state.imageUrl
                : state.image
                ? `data:image/png;base64,${state.image}`
                : "/images/noproduct.png"
            }
            size="medium"
            bordered
            centered
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          onClick={saveItem}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};
