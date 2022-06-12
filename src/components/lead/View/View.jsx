import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import Modal from "react-modal";
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

const View = ({ viewModalShow, setViewModalShow, rowData }) => {
  return (
    <Modal
      isOpen={viewModalShow}
      onRequestClose={() => setViewModalShow(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Card style={{ width: "25rem" }}>
        <Card.Header
          style={{ fontSize: "30px", color: "#2d2b52", textAlign: "center" }}
        >
          Client Data
        </Card.Header>
        <ListGroup variant="flush">
          <Card.Text>
            Name: {rowData.attributes && rowData.attributes.Name}
          </Card.Text>
          <Card.Text>
            Email: {rowData.attributes && rowData.attributes.email}
          </Card.Text>

          <Card.Text>
            {" "}
            Status: {rowData.attributes && rowData.attributes.Status}
          </Card.Text>
          <Card.Text>
            {" "}
            Source: {rowData.attributes && rowData.attributes.Source}
          </Card.Text>
          <Card.Text>
            {" "}
            Notes: {rowData.attributes && rowData.attributes.Notes}
          </Card.Text>
        </ListGroup>
      </Card>
    </Modal>
  );
};

export default View;
