import React, { useState } from "react";
import classes from "./ClientUI.module.css";
import * as Icon from "react-bootstrap-icons";
import ClientModal from "../clientModal/ClientModal";
import { useMutation, useQuery } from "@apollo/client";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { Table } from "react-bootstrap";
import { leads } from "../../../Graphql/Client/Query";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import dayjs from "dayjs";
import UpdateModal from "../updateModal/UpdateModal";
import { DELETE_LEAD } from "../../../Graphql/Client/Mutation";

const ClientUI = () => {
  const [modalShow, setModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [rowData, setRowData] = useState({});
  const { loading, error, data } = useQuery(leads);
  if (loading) return "Loading";
  if (error) return "error";
  //console.log(data.leads.data);
  return (
    <div className={classes.clients}>
      <h1>Clients</h1>
      <ClientHeader setModalShow={setModalShow} />
      <ClientModal modalShow={modalShow} setModalShow={setModalShow} />
      <UpdateModal
        setUpdateModalShow={setUpdateModalShow}
        rowData={rowData}
        updateModalShow={updateModalShow}
      />
      <ClientsTable
        data={data}
        setUpdateModalShow={setUpdateModalShow}
        setRowData={setRowData}
        setViewModalShow={setViewModalShow}
      />
    </div>
  );
};

const ClientHeader = ({ setModalShow }) => (
  <div className={classes.clientHeader}>
    <div className={classes.clientHeaderLeft}>
      <Icon.Search className={classes.clientHeaderLeftIcon} />
      <input type="text" className={classes.clientHeaderInput} />
    </div>
    <div className={classes.clientHeaderRight}>
      <button
        className={classes.clientHeaderRightButton}
        onClick={() => setModalShow(true)}
      >
        <h5 className={classes.clientHeaderRightButtonText}> Add Lead</h5>
        <Icon.PlusCircle className={classes.clientHeaderRightButtonIcon} />
      </button>
    </div>
  </div>
);

const ClientsTable = ({
  data,
  setUpdateModalShow,
  setRowData,
  setViewModalShow,
}) => {
  const [deleteLead, { error }] = useMutation(DELETE_LEAD);
  
  const handleRemove = (id) => {
    console.log({ error });
    deleteLead({
      variables: {
        id: id,
      },
      onCompleted: (res) => {
        if (res) window.location.reload();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  //console.log(data.leads.data);
  return (
    <Table className={classes.table}>
      <thead className={classes.tableHeader}>
        <tr>
          <th>Lead Date</th>
          <th>Name</th>
          <th>Email</th>
          <th>Source</th>
          <th>Last Update</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className={classes.tableBody}>
        {data.leads.data.map((client, index) => {
          return (
            <tr className={classes.dataRow} key={index}>
              <td>
                {dayjs(client.createdAt).format("MMM-DD-YYYY")}
                <p>{dayjs(client.createdAt).format("Z-A")}</p>
              </td>
              <td>{client.attributes.Name}</td>
              <td>{client.attributes.email}</td>
              <td>{client.attributes.Source}</td>
              <td>
                {dayjs(client.attributes.updatedAt).format("MMM-DD-YYYY")}
                <p>{dayjs(client.attributes.updatedAt).format("Z-A")}</p>
              </td>
              <td>
                <button className={classes.statusButton}>
                  {client.attributes.Status}
                </button>
              </td>
              <td>
                <Menu
                  menuButton={
                    <div>
                      <Icon.ThreeDotsVertical
                        className={classes.clientTableIcon}
                      />
                    </div>
                  }
                >
                  <MenuItem
                    onClick={() => {
                      setUpdateModalShow(true);
                      setRowData(client);
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setViewModalShow(true);
                      setRowData(client);
                    }}
                  >
                    View
                  </MenuItem>
                  <MenuItem onClick={() => handleRemove(client.id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ClientUI;
