import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-modal";
import { UPDATE_LEAD } from "../../../Graphql/Client/Mutation";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
var moment = require("moment");
Modal.setAppElement("#root");

const UpdateModal = ({ updateModalShow, setUpdateModalShow, rowData }) => {
  const [data, setData] = useState(null);
  //console.log(rowData.id);
  const [updateLead, { error }] = useMutation(UPDATE_LEAD);
  if (error) return "error";

  const onChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // console.log(data);

  const handleSubmit = (id) => {
    updateLead({
      variables: {
        id: id,
        data: {
          Name: data.name,
          email: data.email,
          date: moment(new Date()).format("YYYY-MM-DD"),
          Source: data.source,
          Status: data.status,
          Notes: data.notes,
        },
      },
      onCompleted: (res) => {
        //console.log(res);

         if (res) window.location.reload();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <Modal
      isOpen={updateModalShow}
      onRequestClose={() => setUpdateModalShow(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Form className="modalFrom">
        <select
          name="status"
          defaultValue={rowData.attributes && rowData.attributes.Status}
          onChange={onChange}
          className="input"
        >
          <option value="New">New</option>
          <option value="Interested">Interested</option>
          <option value="Follow_up">Follow_up</option>
          <option value="Negative"> Negative</option>
          <option value="Enrolled">Enrolled</option>
        </select>
        <select
          name="source"
          onChange={onChange}
          className="input"
          defaultValue={rowData.attributes && rowData.attributes.Source}
        >
          <option value="website">Website</option>
          <option value="google">Google</option>
          <option value="my_app">My app</option>
          <option value="word_of_mouth">word of mouth</option>
        </select>
        <input
          type="text"
          name="name"
          className="input"
          placeholder={rowData.attributes && rowData.attributes.Name}
          onChange={onChange}
        />
        <input
          type="text"
          className="input"
          name="email"
          placeholder={rowData.attributes && rowData.attributes.email}
          onChange={onChange}
        />

        <input type="date" className="input" name="date" onChange={onChange} />
        <textarea
          style={{ height: "100px" }}
          type="text"
          name="notes"
          placeholder={rowData.attributes && rowData.attributes.Notes}
          onChange={onChange}
        />
        <button onClick={() => handleSubmit(rowData.id)}>Edit Client</button>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
