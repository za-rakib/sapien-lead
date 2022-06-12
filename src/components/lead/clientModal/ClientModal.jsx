import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Modal from "react-modal";
import { CREATE_LEAD } from "../../../Graphql/Client/Mutation";

import "./ClientModal.css";
var moment = require("moment");
// import { useMutation } from "@apollo/client";
// import { ADD_CLIENT } from "../../../Graphql/Client/Mutation";
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

Modal.setAppElement("#root");

const ClientModal = ({ modalShow, setModalShow }) => {
  const [data, setData] = useState(null);
  const [createLead, { error }] = useMutation(CREATE_LEAD);

  if (error) return "error";

  const onChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

   console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    createLead({
      variables: {
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
        console.log(res);

         if (res) window.location.reload();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <Modal
      isOpen={modalShow}
      onRequestClose={() => setModalShow(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form className="modalFrom">
        <select
          name="status"
          defaultValue="New"
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
          defaultValue="website"
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
          placeholder="Name"
          onChange={onChange}
        />
        <input
          type="text"
          className="input"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <input
          type="date"
          className="input"
          name="date"
          placeholder="Date"
          onChange={onChange}
        />
        <textarea
          type="text"
          className="textarea"
          name="notes"
          placeholder="Notes"
          onChange={onChange}
        />
        <button onClick={handleSubmit}>Add Client</button>
      </form>
    </Modal>
  );
};

export default ClientModal;
